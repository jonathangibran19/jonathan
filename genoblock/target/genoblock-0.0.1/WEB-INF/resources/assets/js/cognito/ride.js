/*global WildRydes _config*/

var WildRydes = window.WildRydes || {};
WildRydes.map = WildRydes.map || {};

(function rideScopeWrapper($) {
    var authToken;
    WildRydes.authToken.then(function setAuthToken(token) {
        if (token) {
            authToken = token;
        } else {
            window.location.href = '/signin.html';
        }
    }).catch(function handleTokenError(error) {
        alert(error);
        window.location.href = '/signin.html';
    });

    // Register click handler for #request button
    $(function onDocReady() {
        
        $("[id=usrandfactory]").text(getChipInformation());
        $("signout").click()
        $('#request').click(handleRequestClick);
        $('#reset').click(handleResetClick);

        $('#shift_zero').change(handleAllShifts);
        $('input[name=shifts]').change(handleIndividualShifts);

        $(WildRydes.map).on('pickupChange', handlePickupChanged);

        WildRydes.authToken.then(function updateAuthMessage(token) {
            if (token) {
                displayUpdate('You are authenticated. Click to see your <a href="#authTokenModal" data-toggle="modal">auth token</a>.');
                $('.authToken').text(token);
            }
        });
        $(document).ready(function () {            
            $('.sidenav').sidenav();
            $('.dropdown-trigger').dropdown();
            $('.tabs').tabs(); 
            $('.datepicker').datepicker({
                container: document.getElementById("fechaInicio"),
                showDaysInNextAndPreviousMonths: true,
                firstDay: 1,
                yearRange: 1,
                format: 'yyyy-mm-dd',
                showClearBtn: true,
                minDate: new Date("01/01/2017"),
                maxDate: new Date(),
                i18n: {
                    cancel: 'Cancelar',
                    clear: 'Limpiar',
                    done: 'Seleccionar',
                    months: [
                        'Enero',
                        'Febrero',
                        'Marzo',
                        'Abril',
                        'Mayo',
                        'Junio',
                        'Julio',
                        'Agosto',
                        'Septiembre',
                        'Octubre',
                        'Noviembre',
                        'Diciembre'
                    ],
                    monthsShort: [
                        'En',
                        'Feb',
                        'Mar',
                        'Abr',
                        'May',
                        'Jun',
                        'Jul',
                        'Ago',
                        'Sep',
                        'Oct',
                        'Nov',
                        'Deic'
                    ],
                    weekdays: [
                        'Domingo',
                        'Lunes',
                        'Martes',
                        'Miercoles',
                        'Jueves',
                        'Viernes',
                        'Sabado'
                    ],
                    weekdaysShort: [
                        'Dom',
                        'Lun',
                        'Mar',
                        'Mie',
                        'Jue',
                        'Vie',
                        'Sab'
                    ],
                    weekdaysAbbrev: ['D', 'L', 'M', 'X', 'J', 'V', 'S']
                }
            });
            instanceIn = M.Datepicker.getInstance($('#dateIn'));
            instanceOut = M.Datepicker.getInstance($('#dateOut'));
        });
    });

    function handleAllShifts() {
        if ($('#shift_zero').prop('checked')) {
            $("input[name=shifts]").each(function (index) {
                $(this).prop("disabled", true);
                $(this).prop("checked", false);
            });
        } else {
            $("input[name=shifts]").each(function (index) {
                $(this).prop("disabled", false);
            });
        }
    }

    function handleIndividualShifts() {
        let states = [];
        $("input[name=shifts]").each(function (index) {
            states.push($(this).prop("checked"));
        });
        if (states.includes(false)) {
            $('#shift_zero').prop('checked', false);
            $('#shift_zero').prop('disabled', true);
            $("input[name=shifts]").each(function (index) {
                $(this).prop("disabled", false);
            });
        } else {
            $('#shift_zero').prop('checked', true);
            $('#shift_zero').prop('disabled', false);
            $("input[name=shifts]").each(function (index) {
                $(this).prop("disabled", true);
                $(this).prop("checked", false);
            });
        }
        if (states.indexOf(true) === -1) {
            $('#shift_zero').prop('disabled', false);
        }
    }

    function handleResetClick() {
        instanceIn.setDate(new Date());
        instanceIn.gotoDate(new Date());

        instanceOut.setDate(new Date());
        instanceOut.gotoDate(new Date());
    }

    function handleRequestClick(event) {
        let turno, dateIn, dateOut;
        let horario = [24, 0];

        $("input[type=checkbox]:checked").each(function () {
            turno = $(this).val().split("|");
            if (parseFloat(turno[0]) < horario[0]) {
                horario[0] = turno[0];
            }
            if (parseFloat(turno[1]) > horario[1]) {
                horario[1] = turno[1];
            }
        });
        console.log(horario);
        dateIn = instanceIn.toString();
        dateOut = instanceOut.toString();
        if ((dateIn !== "") & (dateOut !== "")) {
            $('#loader').removeClass("hide");
            requestData(dateIn, dateOut, horario[0], horario[1]);
        } else {
            alert("Completa los campos de fecha");
        }
    }

    function requestData(dateIn, dateOut, shiftIn, shiftOut) {
        console.log(dateIn);
        console.log(dateOut);
        $.ajax({
            method: 'POST',
            url: _config.api.invokeUrl + '/getparos-sm',
            headers: {
                Authorization: authToken
            },
            data: JSON.stringify({
                fechas: {
                    f_ini: dateIn,
                    f_fin: dateOut,
                    shiftIn: shiftIn,
                    shiftOut: shiftOut
                }
            }),
            contentType: 'application/json',
            success: completeRequest,
            error: function ajaxError(jqXHR, textStatus, errorThrown) {
                $('#loader').addClass("hide");
                console.log('Error requesting ride: ', textStatus, ', Details: ', errorThrown);
                console.log('Response: ', jqXHR.responseText);
                alert('An error occured in your request:\n' + jqXHR.responseText);
            }
        });
    }

    function completeRequest(result) {
        $('#loader').addClass("hide");
        console.log(result);
        Highcharts.setOptions({
            global: {
                useUTC: false,
            },
            exporting: {
                enabled: false
            },
            credits: {
                enabled: false
            },
            useHTML: {
                enabled: true
            },
            //        negro      azul       naranja    verde      rojo
            colors: ['#2C363F', '#005377', '#FB8B24', '#95C623', '#D72638', '#95C623', '#FF9655', '#FFF263', '#ef6c00']
        });

        var jsonDataQuantity = new Object();
        var jsonArrayQuantity = [];
        $.each(result.quantity.quantity, function (i, item) {
            jsonDataQuantity = new Object();

            jsonDataQuantity.name = item[0];
            jsonDataQuantity.y = item[1];
            switch (item[0]) {
                case "FUNCIONANDO":
                    jsonDataQuantity.color = Highcharts.getOptions().colors[0];
                    break;
                case "PARO_TOTAL":
                    jsonDataQuantity.color = Highcharts.getOptions().colors[1];
                    break;
                case "STANDBY":
                    jsonDataQuantity.color = Highcharts.getOptions().colors[2];
                    break;
                case "DESCONOCIDO":
                    jsonDataQuantity.color = Highcharts.getOptions().colors[3];
                    break;
                default:

                    break;
            }
            jsonArrayQuantity.push(jsonDataQuantity);
        });
        Highcharts.chart('numParos', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Cantidad'
            },
            tooltip: {
                pointFormat: '{series.name}: {point.y:.0f} | <b>{point.percentage:.1f}%</b>'
            },
            credits: {
                enabled: false
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                x: -10,
                y: 80,
                floating: false,
                borderWidth: 0,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.percentage:.1f} %'
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Cantidad',
                    colorByPoint: true,
                    data: jsonArrayQuantity
                }]
        });

        var jsonDataTime = new Object();
        var jsonArrayTime = [];
        $.each(result.times.time, function (i, item) {
            jsonDataTime = new Object();

            jsonDataTime.name = item[0];
            jsonDataTime.y = item[1];
            switch (item[0]) {
                case "FUNCIONANDO":
                    jsonDataTime.color = Highcharts.getOptions().colors[0];
                    break;
                case "PARO_TOTAL":
                    jsonDataTime.color = Highcharts.getOptions().colors[1];
                    break;
                case "STANDBY":
                    jsonDataTime.color = Highcharts.getOptions().colors[2];
                    break;
                case "DESCONOCIDO":
                    jsonDataTime.color = Highcharts.getOptions().colors[3];
                    break;
                default:

                    break;
            }
            jsonArrayTime.push(jsonDataTime);
        });
        Highcharts.chart('timeParos', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Tiempo'
            },
            tooltip: {
                pointFormat: '{series.name}: {point.y:.2f} min | <b>{point.percentage:.1f}%</b>'
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                x: -10,
                y: 80,
                floating: false,
                borderWidth: 0,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: false
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.percentage:.1f} %'
                    },
                    showInLegend: true
                }
            },
            series: [{
                    name: 'Cantidad',
                    colorByPoint: true,
                    data: jsonArrayTime
                }]
        });

        function sortFunction(a, b) {
            if (a[0] === b[0]) {
                return 0;
            } else {
                return (a[0] < b[0]) ? -1 : 1;
            }
        }

        var sorted = [
            [result.quantity.quantity[0][1], result.quantity.quantity[0][0]],
            [result.quantity.quantity[1][1], result.quantity.quantity[1][0]],
            [result.quantity.quantity[2][1], result.quantity.quantity[2][0]],
            [result.quantity.quantity[3][1], result.quantity.quantity[3][0]]
        ];
        sorted.sort(sortFunction);
        var percentage = result.quantity.quantity[0][1] + result.quantity.quantity[1][1] + result.quantity.quantity[2][1] + result.quantity.quantity[3][1];

        var jsonDataParetoQ = new Object();
        var jsonArrayParetoQ = [];
        sorted.forEach(function (el, index) {
            jsonDataParetoQ = new Object();
            switch (sorted[index][1]) {
                case "PARO_TOTAL":
                    jsonDataParetoQ.name = sorted[index][1];
                    jsonDataParetoQ.data = [sorted[index][0]];
                    jsonDataParetoQ.color = Highcharts.getOptions().colors[1];
                    jsonArrayParetoQ.push(jsonDataParetoQ);
                    break;
                case "STANDBY":
                    jsonDataParetoQ.name = sorted[index][1];
                    jsonDataParetoQ.data = [sorted[index][0]];
                    jsonDataParetoQ.color = Highcharts.getOptions().colors[2];
                    jsonArrayParetoQ.push(jsonDataParetoQ);
                    break;
                case "DESCONOCIDO":
                    jsonDataParetoQ.name = sorted[index][1];
                    jsonDataParetoQ.data = [sorted[index][0]];
                    jsonDataParetoQ.color = Highcharts.getOptions().colors[3];
                    jsonArrayParetoQ.push(jsonDataParetoQ);
                    break;
            }
        });
        Highcharts.chart('pareto-quantity', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Cantidad'
            },
            xAxis: {
                categories: ['Paros'],
                title: {
                    text: null
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Incidencias',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                reversedStacks: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            var pcnt = (this.y / percentage) * 100;
                            return Highcharts.numberFormat(pcnt) + '%';
                        }
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                x: -10,
                y: 80,
                floating: false,
                borderWidth: 0,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: false
            },
            credits: {
                enabled: false
            },
            series: jsonArrayParetoQ
        });

        var sorted = [
            [result.times.time[0][1], result.times.time[0][0]],
            [result.times.time[1][1], result.times.time[1][0]],
            [result.times.time[2][1], result.times.time[2][0]],
            [result.times.time[3][1], result.times.time[3][0]]
        ];
        sorted.sort(sortFunction);
        var percentage = result.times.time[0][1] + result.times.time[1][1] + result.times.time[2][1] + result.times.time[3][1];

        var jsonDataParetoT = new Object();
        var jsonArrayParetoT = [];
        sorted.forEach(function (el, index) {
            jsonDataParetoT = new Object();
            switch (sorted[index][1]) {
                case "PARO_TOTAL":
                    jsonDataParetoT.name = sorted[index][1];
                    jsonDataParetoT.data = [sorted[index][0]];
                    jsonDataParetoT.color = Highcharts.getOptions().colors[1];
                    jsonArrayParetoT.push(jsonDataParetoT);
                    break;
                case "STANDBY":
                    jsonDataParetoT.name = sorted[index][1];
                    jsonDataParetoT.data = [sorted[index][0]];
                    jsonDataParetoT.color = Highcharts.getOptions().colors[2];
                    jsonArrayParetoT.push(jsonDataParetoT);
                    break;
                case "DESCONOCIDO":
                    jsonDataParetoT.name = sorted[index][1];
                    jsonDataParetoT.data = [sorted[index][0]];
                    jsonDataParetoT.color = Highcharts.getOptions().colors[3];
                    jsonArrayParetoT.push(jsonDataParetoT);
                    break;
            }
        });
        Highcharts.chart('pareto-time', {
            chart: {
                type: 'bar'
            },
            title: {
                text: 'Tiempo'
            },
            xAxis: {
                categories: ['Paros'],
                title: {
                    text: ""
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'Incidencias',
                    align: 'high'
                },
                labels: {
                    overflow: 'justify'
                },
                reversedStacks: false
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.y:.0f}</b>'
            },
            plotOptions: {
                bar: {
                    dataLabels: {
                        enabled: true,
                        formatter: function () {
                            var pcnt = (this.y / percentage) * 100;
                            return Highcharts.numberFormat(pcnt) + '%';
                        }
                    }
                }
            },
            legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'top',
                x: -10,
                y: 80,
                floating: false,
                borderWidth: 0,
                backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
                shadow: false
            },
            credits: {
                enabled: false
            },
            series: jsonArrayParetoT
        });

        var jsonData = new Object();
        var jsonArray = [];
        $.each(result.hist.hist, function (i, item) {
            jsonData = new Object();

            item[0] = item[0].replace(/-|:|\s/g, ",");
            item[1] = item[1].replace(/-|:|\s/g, ",");

            var item1 = item[0].split(",");
            var item2 = item[1].split(",");

            item[0] = Date.UTC(item1[0], item1[1], item1[2], item1[3], item1[4], item1[5]);
            item[1] = Date.UTC(item2[0], item2[1], item2[2], item2[3], item2[4], item2[5]);

            jsonData.x = item[0];
            jsonData.x2 = item[1];
            jsonData.y = item[2];

            jsonArray.push(jsonData);

        });
        Highcharts.chart('historic', {
            chart: {
                type: 'xrange'
            },
            title: {
                text: 'Paros'
            },
            xAxis: {
                type: 'datetime'
            },
            yAxis: {
                title: {
                    text: 'Estados'
                },
                categories: ['Funcionando', 'Paro total', 'Standby', 'Desconocido'],
                reversed: false
            },
            credits: {
                enabled: false
            },
            series: [{
                    name: '',
                    turboThreshold: 3000000,
                    borderColor: 'white',
                    pointWidth: 50,
                    data: jsonArray,
                    dataLabels: {
                        enabled: false
                    }
                }]
        });

    }

    function handlePickupChanged() {
        var requestButton = $('#request');
        requestButton.text('Request Unicorn');
        requestButton.prop('disabled', false);
    }

    function animateArrival(callback) {
        var dest = WildRydes.map.selectedPoint;
        var origin = {};

        if (dest.latitude > WildRydes.map.center.latitude) {
            origin.latitude = WildRydes.map.extent.minLat;
        } else {
            origin.latitude = WildRydes.map.extent.maxLat;
        }

        if (dest.longitude > WildRydes.map.center.longitude) {
            origin.longitude = WildRydes.map.extent.minLng;
        } else {
            origin.longitude = WildRydes.map.extent.maxLng;
        }

        WildRydes.map.animate(origin, dest, callback);
    }

    function displayUpdate(text) {
        $('#updates').append($('<li>' + text + '</li>'));
    }
}(jQuery));
