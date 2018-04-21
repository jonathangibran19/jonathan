
'use-strict';
app.controller('MonitoreoCntrl', [function () {
        var self = this;
        self.stompClient = null;

        self.hornos1 = [];
        self.horno1requerida = 0;
        self.horno1actual = 0;

        self.hornos2 = [];
        self.horno2requerida = 0;
        self.horno2actual = 0;

        self.hornos3 = [];
        self.horno3requerida = 0;
        self.horno3actual = 0;

        self.hornos4 = [];
        self.horno4requerida = 0;
        self.horno4actual = 0;

        self.hornos5 = [];
        self.horno5requerida = 0;
        self.horno5actual = 0;

        self.hornos6 = [];
        self.horno6requerida = 0;
        self.horno6actual = 0;

        self.hornoTiempoHorneo = 0;
        self.hornoAlturaProducto = 0;
        /************************************Horneo********************************************/


        /************************************Camaras********************************************/
        self.camsHumedo = [];
        self.camHumedoActual = 0;
        self.camHumedoRequerida = 0;

        self.camsSeco = [];
        self.camSecoActual = 0;
        self.camSecoRequerida = 0;

        self.camTiempo = 0;
        self.camAlturaHolgaza = 0;
        /************************************Camaras********************************************/

        /************************************Calculo de toneladas *************************************/

        self.ritmoDivisora = 0;
        self.producto = {};

        self.tonXHoraDividido = 0;
        self.tonXHoraEspecificado = 0;

        self.turno = '';
        self.numeroPersonas = 0;

        self.paquetesXHora = 0;
        self.tonelasXPersona = 0;
        /************************************Calculo de toneladas *************************************/


        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();

            m = checkTime(m);
            s = checkTime(s);
            $('#hora').html(
                    "Hora: " + h + ":" + m + ":" + s);
            var t = setTimeout(startTime, 500);
        }
        ;

        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            ;  // add zero in front of numbers < 10
            return i;
        }
        ;

        $(function () {
            startTime();
        });


        self.connect = function () {
            var socket = new SockJS('/bdp-webapp/bdp-webapp-websocket');
            self.stompClient = Stomp.over(socket);
            self.stompClient.connect({}, function (frame) {


                console.log('Connected: ' + frame);

                self.stompClient.subscribe('/socket/tempovens', function (payload) {

                    var ovensObject = {};
                    ovensObject = JSON.parse(payload.body);

                    /* Separe values */
                    self.separeOvens(ovensObject.values);
                    /* Get temperatures */
                    self.getTemperatures();

                    console.log("Horno altura producto: " + self.hornoAlturaProducto);
                    console.log("Horno tiempo Horneo " + self.hornoTiempoHorneo);

                    $('#hornoTiempoHorneo').html('Tiempo horneo: ' + self.hornoTiempoHorneo + " min.");
                    $('#hornoAlturaProducto').html('Altura producto: ' + self.hornoAlturaProducto + " cm.");
                    

                    $('#horno1requerida').html('Requerida: ' + self.horno1requerida);
                    $('#horno1actual').html('Actual: ' + self.horno1actual);
                    
                    $('#horno2requerida').html('Requerida: ' + self.horno2requerida);
                    $('#horno2actual').html('Actual: ' + self.horno2actual);
                    
                    $('#horno3requerida').html('Requerida: ' + self.horno3requerida);
                    $('#horno3actual').html('Actual: ' + self.horno3actual);
                    
                    $('#horno4requerida').html('Requerida: ' + self.horno4requerida);
                    $('#horno4actual').html('Actual: ' + self.horno4actual);
                    
                    $('#horno5requerida').html('Requerida: ' + self.horno5requerida);
                    $('#horno5actual').html('Actual: ' + self.horno5actual);
                    
                    $('#horno6requerida').html('Requerida: ' + self.horno6requerida);
                    $('#horno6actual').html('Actual: ' + self.horno6actual);


                });

                self.stompClient.subscribe('/socket/camaras', function (payload) {
                    //showGreeting(JSON.parse(greeting.body).content);
                    //console.log("<<<<<<<<<<<<<<<" + (payload.body) + ">>>>>>>>>>>>>>>");

                    var camaraObject = {};
                    camaraObject = JSON.parse(payload.body);

                    /* Separe values */
                    self.separeCams(camaraObject.values);
                    /* Get temperatures */
                    self.getCamsTemperatures();

                    console.log("tmpActHumedo" + self.camHumedoActual);
                    console.log("tmpRequHumedo" + self.camHumedoRequerida);
                    console.log("tmpActSeco" + self.camSecoActual);
                    console.log("tmpRequSeco" + self.camSecoRequerida);
                    console.log("AlturaHolgaza" + self.camAlturaHolgaza);
                    console.log("Tiempo cams" + self.camTiempo);
                    
                    $('#camTiempo').html('Tiempo camaras: ' + self.camTiempo +" min.");
                    $('#camAlturaHolgaza').html('Altura Holgaza: ' + self.camAlturaHolgaza + " cm.");
                    
                    $('#camSecoRequerida').html('Requerida: ' + self.camSecoRequerida);
                    $('#camSecoActual').html('Actual: ' + self.camSecoActual);

                    $('#camHumedoActual').html('Requerida:' + self.camHumedoActual);
                    $('#camHumedoRequerida').html('Actual:' + self.camHumedoRequerida);


                });

                self.stompClient.subscribe('/socket/productionbydivider', function (payload) {

                    var productionByDivider = {};

                    productionByDivider = JSON.parse(payload.body);

                    self.producto = productionByDivider.product;

                    self.ritmoDivisora = parseInt(productionByDivider.v);
                    self.turno = productionByDivider.turno;
                    self.numeroPersonas = parseInt(productionByDivider.numPersonas);

                    var turno = (productionByDivider.turno);

                    $("#turno").html("Turno: " + turno);
                    $("#producto").html("Producto: " + self.producto.description);
                    $("#ritmo").html("Ritmo divisora: " + self.ritmoDivisora);




                    console.log(productionByDivider);
                    console.log(self.producto);


                    console.log('Numero personas: ' + self.numeroPersonas);
                    console.log('Ritmo divisora' + self.ritmoDivisora);
                    console.log('Peso dividido' + self.producto.weightDividedKg);
                    console.log('Peso especificado: ' + self.producto.weightKg);
                    console.log('P/Hr requ prod: ' + self.producto.tape);


                    self.tonXHoraDividido = (Math.round((parseFloat(self.ritmoDivisora) * (parseFloat(self.producto.weightDividedKg) / 1000) * (60)) * 100) / 100);
                    self.tonXHoraEspecificado = (Math.round(((self.ritmoDivisora) * (parseFloat(self.producto.weightKg) / 1000) * (60)) * 100) / 100);

                    self.paquetesXHora = parseInt(self.ritmoDivisora) * 60;
                    self.tonelasXPersona = (parseInt(self.ritmoDivisora) * 60) / parseInt(self.numeroPersonas);



                    console.log('Dividido: ' + self.tonXHoraDividido);
                    console.log('Especificado: ' + self.tonXHoraEspecificado);
                    console.log('PaquetesXHora: ' + self.paquetesXHora);
                    console.log('ToneladasXPersona: ' + self.tonelasXPersona);


                    $("#tonXHoraDividido").html( self.tonXHoraDividido +" ton/hr.");
                    $("#tonXHoraEspecificado").html( self.tonXHoraEspecificado  + " ton/hr." );
                    $("#paquetesXHora").html( self.paquetesXHora + " paq/hr.");
                    $("#tonelasXPersona").html(self.tonelasXPersona + " ton/pers.");

                });

            });
        };

        self.separeOvens = function (ovens) {
            self.hornos1 = [];
            self.hornos2 = [];
            self.hornos3 = [];
            self.hornos4 = [];
            self.hornos5 = [];
            self.hornos6 = [];
            ovens.forEach(function (value, index) {
                if (value.id.includes('_01_Temp')) {
                    self.hornos1.push(value);
                } else if (value.id.includes('_02_Temp')) {
                    self.hornos2.push(value);
                } else if (value.id.includes('_03_Temp')) {
                    self.hornos3.push(value);
                } else if (value.id.includes('_04_Temp')) {
                    self.hornos4.push(value);
                } else if (value.id.includes('_05_Temp')) {
                    self.hornos5.push(value);
                } else if (value.id.includes('_06_Temp')) {
                    self.hornos6.push(value);
                }
                if (value.id.includes('_Altura_')) {
                    self.hornoAlturaProducto = parseFloat(value.v);
                }
                if (value.id.includes('_Tiempo_')) {
                    self.hornoTiempoHorneo = Math.round((parseFloat(value.v) * 100) / 100);
                }

            });
        };
        self.getTemperatures = function () {

            if (self.hornos1[1].id.includes('_Requerida_')) {
                self.horno1requerida = parseInt(self.hornos1[1].v);
                self.horno1actual = parseInt(self.hornos1[0].v);
            } else {
                self.horno1requerida = parseInt(self.hornos1[0].v);
                self.horno1actual = parseInt(self.hornos1[1].v);
            }
            if (self.hornos2[1].id.includes('_Requerida_')) {
                self.horno2requerida = parseInt(self.hornos2[1].v);
                self.horno2actual = parseInt(self.hornos2[0].v);
            } else {
                self.horno2requerida = parseInt(self.hornos2[1].v);
                self.horno2actual = parseInt(self.hornos2[0].v);
            }

            if (self.hornos3[1].id.includes('_Requerida_')) {
                self.horno3requerida = parseInt(self.hornos3[1].v);
                self.horno3actual = parseInt(self.hornos3[0].v);
            } else {
                self.horno3requerida = parseInt(self.hornos3[0].v);
                self.horno3actual = parseInt(self.hornos3[1].v);
            }

            if (self.hornos4[1].id.includes('_Requerida_')) {
                self.horno4requerida = parseInt(self.hornos4[1].v);
                self.horno4actual = parseInt(self.hornos4[0].v);
            } else {
                self.horno4requerida = parseInt(self.hornos4[0].v);
                self.horno4actual = parseInt(self.hornos4[1].v);
            }

            if (self.hornos5[1].id.includes('_Requerida_')) {
                self.horno5requerida = parseInt(self.hornos5[1].v);
                self.horno5actual = parseInt(self.hornos5[0].v);
            } else {
                self.horno5requerida = parseInt(self.hornos5[0].v);
                self.horno5actual = parseInt(self.hornos5[1].v);
            }

            if (self.hornos6[1].id.includes('_Requerida_')) {
                self.horno6requerida = parseInt(self.hornos6[1].v);
                self.horno6actual = parseInt(self.hornos6[0].v);
            } else {
                self.horno6requerida = parseInt(self.hornos6[0].v);
                self.horno6actual = parseInt(self.hornos6[1].v);
            }

        };


        self.separeCams = function (ovens) {
            self.camsHumedo = [];
            self.camsSeco = [];

            ovens.forEach(function (value, index) {

                if (value.id.includes('_Humedo')) {
                    self.camsHumedo.push(value);
                } else if (value.id.includes('_Seco')) {
                    self.camsSeco.push(value);
                } else if (value.id.includes('_Altura')) {
                    self.camAlturaHolgaza = (Math.round(parseFloat(value.v) * 100) / 100);
                } else if (value.id.includes('_Tiempo_')) {
                    self.camTiempo = parseInt(value.v);
                }
            });
        };
        self.getCamsTemperatures = function () {

            if (self.camsHumedo[1].id.includes('_Actual_')) {
                self.camHumedoActual = parseInt(self.camsHumedo[1].v);
                self.camHumedoRequerida = parseInt(self.camsHumedo[0].v);
            } else {
                self.camHumedoActual = parseInt(self.camsHumedo[0].v);
                self.camHumedoRequerida = parseInt(self.camsHumedo[1].v);
            }

            if (self.camsSeco[1].id.includes('_Actual_')) {
                self.camSecoActual = parseInt(self.camsSeco[1].v);
                self.camSecoRequerida = parseInt(self.camsSeco[0].v);
            } else {
                self.camSecoActual = parseInt(self.camsSeco[0].v);
                self.camSecoRequerida = parseInt(self.camsSeco[1].v);
            }


        };



        /*Unsuscribe stomp client*/
        self.disconnect = function () {
            if (self.stompClient !== null) {
                self.stompClient.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        };

        console.log("<------Connecting------>");
        self.connect();

        /*---------------------------------High charts section-----------------------------*/
        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            credits: {
                enabled: false
            },
            useHTML: {
                enabled: true
            },
            colors: ['#ee2525', '#25327b', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4']
        });

        Highcharts.chart('horno1', {
            chart: {
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {
                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno1actual; //peticion al server
                            series.addPoint([x, y], true, true);
                            //document.getElementById('horno1requerida').innerHTML = self.horno1actual + "°";
                            //$("#horno1requerida").html(self.horno1actual + "°");
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno1requerida; //peticion al server
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: 'Hora'
                },
                type: 'datetime',
                tickPixelInterval: 100
            },
            yAxis: {
                title: {
                    text: 'Temperatura °C'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#FF6422'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });
        Highcharts.chart('horno2', {
            chart: {
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno2actual; //peticion al server
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno2requerida; //peticion al server
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: 'Hora'
                },
                type: 'datetime',
                tickPixelInterval: 50
            },
            yAxis: {
                title: {
                    text: 'Temperatura °C'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#25327b'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });
        Highcharts.chart('horno3', {
            chart: {
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno3actual; //peticion al server
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno3requerida; //peticion al server
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }

                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: 'Hora'
                },
                type: 'datetime',
                tickPixelInterval: 50
            },
            yAxis: {
                title: {
                    text: 'Temperatura °C'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#25327b'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });
        Highcharts.chart('horno4', {
            chart: {
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno4actual; //peticion al server
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno4requerida; //peticion al server
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: 'Hora'
                },
                type: 'datetime',
                tickPixelInterval: 50
            },
            yAxis: {
                title: {
                    text: 'Temperatura °C'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#25327b'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });
        Highcharts.chart('horno5', {
            chart: {
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno5actual; //peticion al server
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno5requerida; //peticion al server
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: 'Hora'
                },
                type: 'datetime',
                tickPixelInterval: 50
            },
            yAxis: {
                title: {
                    text: 'Temperatura °C'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#25327b'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requeridaerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });
        Highcharts.chart('horno6', {
            chart: {
                type: 'line',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno6actual; //peticion al server
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.horno6requerida; //peticion al server
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                title: {
                    text: 'Hora'
                },
                type: 'datetime',
                tickPixelInterval: 50
            },
            yAxis: {
                title: {
                    text: 'Temperatura °C'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#25327b'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });

        Highcharts.chart('temperatura', {
            chart: {
                type: 'area',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.camSecoActual;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    //peticion al server
                                    y = self.camSecoRequerida;
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Temperatura'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#25327b'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });//camara de bulbo seco
        Highcharts.chart('humedad', {
            chart: {
                type: 'area',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];

                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    y = self.camHumedoRequerida;
                            series.addPoint([x, y], true, true);
                        }, 1000);
                        var series2 = this.series[1];
                        setInterval(function () {
                            var x = (new Date()).getTime(), // current time
                                    //peticion al server
                                    y = self.camHumedoActual;
                            series2.addPoint([x, y], true, true);
                        }, 1000);
                    }
                }
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Humedad'
                },
                plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#25327b'
                    }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                            Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                            Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                    name: 'Temp actual',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }, {
                    name: 'Temp Requerida',
                    data: (function () {
                        // generate an array of random data
                        var data = [],
                                time = (new Date()).getTime(), i;
                        for (i = -19; i <= 0; i += 1) {
                            data.push({
                                x: time + i * 1000,
                                y: Math.random()
                            });
                        }
                        return data;
                    }())
                }]
        });

//Toneladas/Hora (peso especificado)
        Highcharts.chart('speed1', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0, //valor minimo de la grafica
                max: 20, // valor maximo de la grafica

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5 ',

                tickPixelInterval: 100,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'P/Hr'
                },
                plotBands: [
                    {
                        from: 0,
                        to: 7,
                        color: '#64dd17' // green
                    }, {
                        from: 7,
                        to: 13,
                        color: '#ffd600' // yellow
                    }, {
                        from: 13,
                        to: 20,
                        color: '#b71c1c' // red
                    }]
            },

            series: [{
                    name: 'Velocidad',
                    data: [8500], //valor de inicio debe estar dentro del rango
                    tooltip: {
                        valueSuffix: ' P/hr'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0], newVal, inc = Math.round((Math.random() - 0.5) * 20);
                            newVal = point.y + inc;
                            if (newVal < 8100 || newVal > 8700) {
                                newVal = point.y - inc;
                            }
                            point.update(self.tonXHoraEspecificado);
                        }, 1000);
                    }
                });

//Toneladas/Hora (peso dividido)
        Highcharts.chart('speed2', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 20,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5',

                tickPixelInterval: 100,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'ton'
                },
                plotBands: [
                    {
                        from: 0,
                        to: 7,
                        color: '#64dd17' // green
                    }, {
                        from: 7,
                        to: 15,
                        color: '#ffd600' // yellow
                    }, {
                        from: 15,
                        to: 20,
                        color: '#b71c1c' // red
                    }]

            },
            series: [{
                    name: 'Toneladas/Hora',
                    data: [8800],
                    tooltip: {
                        valueSuffix: ' ton'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                    newVal,
                                    inc = Math.round((Math.random() - 0.5) * 20);

                            newVal = point.y + inc;
                            if (newVal < 8600 || newVal > 9300) {
                                newVal = point.y - inc;
                            }

                            point.update(self.tonXHoraDividido);

                        }, 1000);
                    }
                });

        /*toneladas por persona*/
        Highcharts.chart('speed3', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 1000,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5',

                tickPixelInterval: 100,
                tickWidth: 3,
                tickPosition: 'inside',
                tickLength: 20,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'Ton/Persona'
                },
                plotBands: [{
                        from: 0,
                        to: 300,
                        color: '#b71c1c' // red
                    }, {
                        from: 300,
                        to: 600,
                        color: '#ffd600' // yellow
                    }, {
                        from: 600,
                        to: 1000,
                        color: '#64dd17' // green b71c1c
                    }]

            },
            series: [{
                    name: 'Toneladas/Persona ',
                    data: [1],
                    tooltip: {
                        valueSuffix: ' ton'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                    newVal,
                                    inc = Math.round((Math.random() - 0.5) * 3);

                            newVal = point.y + inc;
                            if (newVal < 0 || newVal > 3) {
                                newVal = point.y - inc;
                            }

                            point.update(self.tonelasXPersona);

                        }, 1000);
                    }
                });

        /*paquetes por hora*/
        Highcharts.chart('speed4', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 10000,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5',

                tickPixelInterval: 100,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'Paq/Hr'
                },
                plotBands: [{
                        from: 0,
                        to: 2000,
                        color: '#b71c1c' // red
                    }, {
                        from: 2000,
                        to: 4000,
                        color: '#ffd600' // yellow
                    }, {
                        from: 4000,
                        to: 6000,
                        color: '#64dd17' // green
                    }, {
                        from: 6000,
                        to: 8000,
                        color: '#ffd600' // yellow
                    }, {
                        from: 8000,
                        to: 10000,
                        color: '#b71c1c' // red
                    }]

            },
            series: [{
                    name: 'Paquetes/Hora',
                    data: [500],
                    tooltip: {
                        valueSuffix: ' paquetes.'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                    newVal,
                                    inc = Math.round((Math.random() - 0.5) * 20);

                            newVal = point.y + inc;
                            if (newVal < 0 || newVal > 1000) {
                                newVal = point.y - inc;
                            }

                            point.update(self.paquetesXHora);

                        }, 1000);
                    }
                });

        /*tiempo horneo*/
        Highcharts.chart('speed5', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 35,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5',

                tickPixelInterval: 100,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'min'
                },
                plotBands: [{
                        from: 0,
                        to: 7,
                        color: '#b71c1c' // red
                    }, {
                        from: 7,
                        to: 15,
                        color: '#ffd600' // yellow
                    }, {
                        from: 15,
                        to: 25,
                        color: '#64dd17' // green
                    }, {
                        from: 25,
                        to: 30,
                        color: '#ffd600' // yellow
                    }, {
                        from: 30,
                        to: 35,
                        color: '#b71c1c' // red
                    }]

            },
            series: [{
                    name: 'tiempo horneo:',
                    data: [35],
                    tooltip: {
                        valueSuffix: ' min'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                    newVal,
                                    inc = Math.round((Math.random() - 0.5) * 20);

                            newVal = point.y + inc;
                            if (newVal < 8600 || newVal > 9300) {
                                newVal = point.y - inc;
                            }

                            point.update(self.hornoTiempoHorneo);

                        }, 1000);
                    }
                });

        /*Altura del producto*/
        Highcharts.chart('speed6', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 25,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5',

                tickPixelInterval: 100,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'cm'
                },
                plotBands: [{
                        from: 0,
                        to: 4,
                        color: '#b71c1c' // red
                    }, {
                        from: 4,
                        to: 8,
                        color: '#ffd600' // yellow
                    }, {
                        from: 8,
                        to: 15,
                        color: '#64dd17' // green
                    }, {
                        from: 15,
                        to: 20,
                        color: '#ffd600' // yellow
                    }, {
                        from: 20,
                        to: 25,
                        color: '#b71c1c' // red
                    }]

            },
            series: [{
                    name: 'Altura: ',
                    data: [15],
                    tooltip: {
                        valueSuffix: ' cm'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                    newVal,
                                    inc = Math.round((Math.random() - 0.5) * 20);

                            newVal = point.y + inc;
                            if (newVal < 8600 || newVal > 9300) {
                                newVal = point.y - inc;
                            }

                            point.update(self.hornoAlturaProducto);

                        }, 1000);
                    }
                });

        /*Tiempo camara*/
        Highcharts.chart('speed7', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 100,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5',

                tickPixelInterval: 100,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'Min'
                },
                plotBands: [{
                        from: 0,
                        to: 20,
                        color: '#b71c1c' // red
                    }, {
                        from: 20,
                        to: 40,
                        color: '#ffd600' // yellow
                    }, {
                        from: 40, //
                        to: 60,
                        color: '#64dd17' // green
                    }, {
                        from: 60,
                        to: 80,
                        color: '#ffd600' // yellow
                    }, {
                        from: 80,
                        to: 100,
                        color: '#b71c1c' // red
                    }]

            },
            series: [{
                    name: 'Velocdidad',
                    data: [15],
                    tooltip: {
                        valueSuffix: 'minutes'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                    newVal,
                                    inc = Math.round((Math.random() - 0.5) * 20);

                            newVal = point.y + inc;
                            if (newVal < 8600 || newVal > 9300) {
                                newVal = point.y - inc;
                            }

                            point.update(self.camTiempo);

                        }, 1000);
                    }
                });

        /*Alura holgaza*/
        Highcharts.chart('speed8', {
            chart: {
                type: 'gauge',
                plotBackgroundColor: null,
                plotBackgroundImage: null,
                plotBorderWidth: 0,
                plotShadow: false
            },
            title: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            subtitle: {
                text: '',
                style: {
                    display: 'none'
                }
            },
            pane: {
                startAngle: -150,
                endAngle: 150,
                background: [{
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#FFF'],
                                [1, '#333']
                            ]
                        },
                        borderWidth: 0,
                        outerRadius: '109%'
                    }, {
                        backgroundColor: {
                            linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                            stops: [
                                [0, '#333'],
                                [1, '#FFF']
                            ]
                        },
                        borderWidth: 1,
                        outerRadius: '107%'
                    }, {
                        // default background
                    }, {
                        backgroundColor: '#616161',
                        borderWidth: 0,
                        outerRadius: '105%',
                        innerRadius: '103%'
                    }]
            },

            // the value axis
            yAxis: {
                min: 0,
                max: 25,

                minorTickInterval: 'auto',
                minorTickWidth: 1,
                minorTickLength: 10,
                minorTickPosition: 'inside',
                minorTickColor: '#f5f5f5',

                tickPixelInterval: 100,
                tickWidth: 2,
                tickPosition: 'inside',
                tickLength: 10,
                tickColor: '#fff',
                labels: {
                    step: 2,
                    rotation: 'auto'
                },
                title: {
                    text: 'cm'
                },
                plotBands: [{
                        from: 0,
                        to: 5,
                        color: '#b71c1c' // red
                    }, {
                        from: 5,
                        to: 10,
                        color: '#ffd600' // yellow
                    }, {
                        from: 10,
                        to: 15,
                        color: '#64dd17' // green
                    }, {
                        from: 15,
                        to: 20,
                        color: '#ffd600' // yellow
                    }, {
                        from: 20,
                        to: 25,
                        color: '#b71c1c' // red
                    }]

            },
            series: [{
                    name: 'altura: ',
                    data: [15],
                    tooltip: {
                        valueSuffix: ' cm'
                    }
                }]

        },
// Add some life
                function (chart) {
                    if (!chart.renderer.forExport) {
                        setInterval(function () {
                            var point = chart.series[0].points[0],
                                    newVal,
                                    inc = Math.round((Math.random() - 0.5) * 20);

                            newVal = point.y + inc;
                            if (newVal < 8600 || newVal > 9300) {
                                newVal = point.y - inc;
                            }

                            point.update(self.camAlturaHolgaza);

                        }, 1000);
                    }
                });

        /*****************************************************************************************************/

    }]);//del controlador de angular 
