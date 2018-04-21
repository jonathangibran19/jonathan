'use-strict';
AppGeneric.controller('ControllerAppGeneric', ['$interval', '$rootScope', function ($interval, $rootScope) {
        var self = this;


        self.URL_CONTEXT = "/gbmonitoring";
        self.URL_SOCKET_BROKER = "/socket";

        self.URL_SOCKET_ENDPOINT = self.URL_CONTEXT + "/gbmonitoring-websocket";

        self.URL_STREAM = self.URL_SOCKET_BROKER + "/stream";


        /*Configuracion de las graficas*/
        self.graficasConf = [
            {id: 1, nombre: 'grafica-1', titulo: 'titulo-1', idTag: {idTag: "grafica1"}},
            {id: 2, nombre: 'grafica-2', titulo: 'titulo-2', idTag: {idTag: "grafica2"}},
            {id: 3, nombre: 'grafica-3', titulo: 'titulo-3', idTag: {idTag: "grafica3"}},
            {id: 4, nombre: 'grafica-4', titulo: 'titulo-4', idTag: {idTag: "grafica4"}}
        ];

        self.mapa = new Map();
        self.mapaIds = new Map();


        self.connect = function () {
            var socket = new SockJS(self.URL_SOCKET_ENDPOINT);
            self.STOMP_CLIENT = Stomp.over(socket);
            self.STOMP_CLIENT.debug = false; //deshabilita eldebug.
            self.STOMP_CLIENT.connect({}, function (frame) {



                /*Recibe la configuracion de los graficos tinas elaboradas*/
                self.STOMP_CLIENT.subscribe(self.URL_STREAM, function (payload) {
                    payload = JSON.parse(payload.body);
                    $rootScope.$apply(function () {
                        self.separarValores(payload);
                    });
                });


            });
        };

        /*Unsubscribe stomp client function*/
        self.disconnect = function () {
            if (self.STOMP_CLIENT !== null) {
                self.STOMP_CLIENT.disconnect();
            }
            setConnected(false);
            console.log("Disconnected");
        };


        Highcharts.setOptions({
            global: {
                useUTC: false
            },
            credits: {
                enabled: false
            },
            useHTML: {
                enabled: true
            }
        });

        self.crearGrafica = function (nombreGrafica, titulo, id) {

            var algo = Highcharts.chart(nombreGrafica, {
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
                                        //y = 10; //peticion al server
                                        y = Number.parseFloat((self.buscar(id)));
                                series.addPoint([x, y], true, true);

                            }, 1000);
                        }
                    }
                },
                title: {
                    text: titulo,
                    style: {
                        display: 'absolute'
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
                    tickPixelInterval: 1
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
                    ,max : 400
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
                    }]
            });

        };// function crear grafica

        self.buscar = function (id) {
            if (id !== 'undefined') {
                return Number.parseFloat(self.mapa.get(id).valor);
            }
            return 0;

        };

        self.separarValores = function (valores) {
            var id;
            var obj = {};
            valores.forEach(function (item) {
                id = self.mapaIds.get(item.idTag);

                if (id !== 'undefined') {
                    obj = self.mapa.get(id);
                    obj.valor = item.valor;
                    self.mapa.set(id, obj);
                }
            });
            console.log(self.mapa);

        };

        /*Cuando el documento este listo*/
        angular.element(document).ready(function () {

            self.graficasConf.forEach(function (conf) {
                self.crearGrafica(conf.nombre, conf.titulo, conf.id);
                self.mapa.set(conf.id, {valor: 0, idTag: conf.idTag});
                self.mapaIds.set(conf.idTag.idTag, conf.id);
            });

//            console.log("mapa");
//            console.log(self.mapa);
//            console.log("Mapa IDS");
//            console.log(self.mapaIds);
            self.connect();
        });


    }]);


