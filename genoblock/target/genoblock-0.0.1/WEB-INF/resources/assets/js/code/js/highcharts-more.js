/*
 Highcharts JS v6.0.3 (2017-11-14)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(w){"object"===typeof module&&module.exports?module.exports=w:w(Highcharts)})(function(w){(function(a){var m=a.deg2rad,r=a.isNumber,u=a.pick,k=a.relativeLength;a.CenteredSeriesMixin={getCenter:function(){var a=this.options,h=this.chart,q=2*(a.slicedOffset||0),c=h.plotWidth-2*q,h=h.plotHeight-2*q,b=a.center,b=[u(b[0],"50%"),u(b[1],"50%"),a.size||"100%",a.innerSize||0],p=Math.min(c,h),g,d;for(g=0;4>g;++g)d=b[g],a=2>g||2===g&&/%$/.test(d),b[g]=k(d,[c,h,p,b[2]][g])+(a?q:0);b[3]>b[2]&&(b[3]=b[2]);
return b},getStartAndEndRadians:function(a,h){a=r(a)?a:0;h=r(h)&&h>a&&360>h-a?h:a+360;return{start:m*(a+-90),end:m*(h+-90)}}}})(w);(function(a){function m(a,c){this.init(a,c)}var r=a.CenteredSeriesMixin,u=a.each,k=a.extend,f=a.merge,h=a.splat;k(m.prototype,{coll:"pane",init:function(a,c){this.chart=c;this.background=[];c.pane.push(this);this.setOptions(a)},setOptions:function(a){this.options=f(this.defaultOptions,this.chart.angular?{background:{}}:void 0,a)},render:function(){var a=this.options,c=
this.options.background,b=this.chart.renderer;this.group||(this.group=b.g("pane-group").attr({zIndex:a.zIndex||0}).add());this.updateCenter();if(c)for(c=h(c),a=Math.max(c.length,this.background.length||0),b=0;b<a;b++)c[b]&&this.axis?this.renderBackground(f(this.defaultBackgroundOptions,c[b]),b):this.background[b]&&(this.background[b]=this.background[b].destroy(),this.background.splice(b,1))},renderBackground:function(a,c){var b="animate";this.background[c]||(this.background[c]=this.chart.renderer.path().add(this.group),
b="attr");this.background[c][b]({d:this.axis.getPlotBandPath(a.from,a.to,a)}).attr({"class":"highcharts-pane "+(a.className||"")})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",from:-Number.MAX_VALUE,innerRadius:0,to:Number.MAX_VALUE,outerRadius:"105%"},updateCenter:function(a){this.center=(a||this.axis||{}).center=r.getCenter.call(this)},update:function(a,c){f(!0,this.options,a);this.setOptions(this.options);this.render();u(this.chart.axes,
function(b){b.pane===this&&(b.pane=null,b.update({},c))},this)}});a.Pane=m})(w);(function(a){var m=a.each,r=a.extend,u=a.map,k=a.merge,f=a.noop,h=a.pick,q=a.pInt,c=a.wrap,b,p,g=a.Axis.prototype;a=a.Tick.prototype;b={getOffset:f,redraw:function(){this.isDirty=!1},render:function(){this.isDirty=!1},setScale:f,setCategories:f,setTitle:f};p={defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,
tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,distance:15,x:0,y:null},maxPadding:0,minPadding:0,showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(d){d=this.options=k(this.defaultOptions,this.defaultRadialOptions,d);d.plotBands||(d.plotBands=[])},getOffset:function(){g.getOffset.call(this);
this.chart.axisOffset[this.side]=0},getLinePath:function(d,b){d=this.center;var c=this.chart,e=h(b,d[2]/2-this.offset);this.isCircular||void 0!==b?(b=this.chart.renderer.symbols.arc(this.left+d[0],this.top+d[1],e,e,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0}),b.xBounds=[this.left+d[0]],b.yBounds=[this.top+d[1]-e]):(b=this.postTranslate(this.angleRad,e),b=["M",d[0]+c.plotLeft,d[1]+c.plotTop,"L",b.x,b.y]);return b},setAxisTranslation:function(){g.setAxisTranslation.call(this);this.center&&
(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.minPixelPadding=this.isXAxis?this.transA*this.minPointOffset:0)},beforeSetTickPositions:function(){if(this.autoConnect=this.isCircular&&void 0===h(this.userMax,this.options.max)&&this.endAngleRad-this.startAngleRad===2*Math.PI)this.max+=this.categories&&1||this.pointRange||this.closestPointRange||0},setAxisSize:function(){g.setAxisSize.call(this);this.isRadial&&(this.pane.updateCenter(this),
this.isCircular&&(this.sector=this.endAngleRad-this.startAngleRad),this.len=this.width=this.height=this.center[2]*h(this.sector,1)/2)},getPosition:function(d,b){return this.postTranslate(this.isCircular?this.translate(d):this.angleRad,h(this.isCircular?b:this.translate(d),this.center[2]/2)-this.offset)},postTranslate:function(d,b){var c=this.chart,e=this.center;d=this.startAngleRad+d;return{x:c.plotLeft+e[0]+Math.cos(d)*b,y:c.plotTop+e[1]+Math.sin(d)*b}},getPlotBandPath:function(d,b,c){var e=this.center,
a=this.startAngleRad,p=e[2]/2,g=[h(c.outerRadius,"100%"),c.innerRadius,h(c.thickness,10)],t=Math.min(this.offset,0),f=/%$/,y,k=this.isCircular;"polygon"===this.options.gridLineInterpolation?e=this.getPlotLinePath(d).concat(this.getPlotLinePath(b,!0)):(d=Math.max(d,this.min),b=Math.min(b,this.max),k||(g[0]=this.translate(d),g[1]=this.translate(b)),g=u(g,function(b){f.test(b)&&(b=q(b,10)*p/100);return b}),"circle"!==c.shape&&k?(d=a+this.translate(d),b=a+this.translate(b)):(d=-Math.PI/2,b=1.5*Math.PI,
y=!0),g[0]-=t,g[2]-=t,e=this.chart.renderer.symbols.arc(this.left+e[0],this.top+e[1],g[0],g[0],{start:Math.min(d,b),end:Math.max(d,b),innerR:h(g[1],g[0]-g[2]),open:y}));return e},getPlotLinePath:function(b,c){var d=this,e=d.center,a=d.chart,p=d.getPosition(b),g,f,h;d.isCircular?h=["M",e[0]+a.plotLeft,e[1]+a.plotTop,"L",p.x,p.y]:"circle"===d.options.gridLineInterpolation?(b=d.translate(b))&&(h=d.getLinePath(0,b)):(m(a.xAxis,function(b){b.pane===d.pane&&(g=b)}),h=[],b=d.translate(b),e=g.tickPositions,
g.autoConnect&&(e=e.concat([e[0]])),c&&(e=[].concat(e).reverse()),m(e,function(d,c){f=g.getPosition(d,b);h.push(c?"L":"M",f.x,f.y)}));return h},getTitlePosition:function(){var b=this.center,c=this.chart,a=this.options.title;return{x:c.plotLeft+b[0]+(a.x||0),y:c.plotTop+b[1]-{high:.5,middle:.25,low:0}[a.align]*b[2]+(a.y||0)}}};c(g,"init",function(d,c,a){var e=c.angular,g=c.polar,t=a.isX,v=e&&t,f,q=c.options,y=a.pane||0,m=this.pane=c.pane&&c.pane[y],y=m&&m.options;if(e){if(r(this,v?b:p),f=!t)this.defaultRadialOptions=
this.defaultRadialGaugeOptions}else g&&(r(this,p),this.defaultRadialOptions=(f=t)?this.defaultRadialXOptions:k(this.defaultYAxisOptions,this.defaultRadialYOptions));e||g?(this.isRadial=!0,c.inverted=!1,q.chart.zoomType=null):this.isRadial=!1;m&&f&&(m.axis=this);d.call(this,c,a);!v&&m&&(e||g)&&(d=this.options,this.angleRad=(d.angle||0)*Math.PI/180,this.startAngleRad=(y.startAngle-90)*Math.PI/180,this.endAngleRad=(h(y.endAngle,y.startAngle+360)-90)*Math.PI/180,this.offset=d.offset||0,this.isCircular=
f)});c(g,"autoLabelAlign",function(b){if(!this.isRadial)return b.apply(this,[].slice.call(arguments,1))});c(a,"getPosition",function(b,c,a,g,p){var d=this.axis;return d.getPosition?d.getPosition(a):b.call(this,c,a,g,p)});c(a,"getLabelPosition",function(b,c,a,g,p,x,v,f,k){var d=this.axis,e=x.y,n=20,t=x.align,l=(d.translate(this.pos)+d.startAngleRad+Math.PI/2)/Math.PI*180%360;d.isRadial?(b=d.getPosition(this.pos,d.center[2]/2+h(x.distance,-25)),"auto"===x.rotation?g.attr({rotation:l}):null===e&&(e=
d.chart.renderer.fontMetrics(g.styles.fontSize).b-g.getBBox().height/2),null===t&&(d.isCircular?(this.label.getBBox().width>d.len*d.tickInterval/(d.max-d.min)&&(n=0),t=l>n&&l<180-n?"left":l>180+n&&l<360-n?"right":"center"):t="center",g.attr({align:t})),b.x+=x.x,b.y+=e):b=b.call(this,c,a,g,p,x,v,f,k);return b});c(a,"getMarkPath",function(b,c,a,g,p,f,v){var d=this.axis;d.isRadial?(b=d.getPosition(this.pos,d.center[2]/2+g),c=["M",c,a,"L",b.x,b.y]):c=b.call(this,c,a,g,p,f,v);return c})})(w);(function(a){var m=
a.each,r=a.pick,u=a.defined,k=a.seriesType,f=a.seriesTypes,h=a.Series.prototype,q=a.Point.prototype;k("arearange","area",{threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{series.colorIndex}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},trackByArea:!0,dataLabels:{align:null,verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}},{pointArrayMap:["low","high"],dataLabelCollections:["dataLabel","dataLabelUpper"],
toYData:function(c){return[c.low,c.high]},pointValKey:"low",deferTranslatePolar:!0,highToXY:function(c){var b=this.chart,a=this.xAxis.postTranslate(c.rectPlotX,this.yAxis.len-c.plotHigh);c.plotHighX=a.x-b.plotLeft;c.plotHigh=a.y-b.plotTop;c.plotLowX=c.plotX},translate:function(){var c=this,b=c.yAxis,a=!!c.modifyValue;f.area.prototype.translate.apply(c);m(c.points,function(g){var d=g.low,e=g.high,p=g.plotY;null===e||null===d?(g.isNull=!0,g.plotY=null):(g.plotLow=p,g.plotHigh=b.translate(a?c.modifyValue(e,
g):e,0,1,0,1),a&&(g.yBottom=g.plotHigh))});this.chart.polar&&m(this.points,function(b){c.highToXY(b);b.tooltipPos=[(b.plotHighX+b.plotLowX)/2,(b.plotHigh+b.plotLow)/2]})},getGraphPath:function(c){var b=[],a=[],g,d=f.area.prototype.getGraphPath,e,t,n;n=this.options;var l=this.chart.polar&&!1!==n.connectEnds,x=n.connectNulls,v=n.step;c=c||this.points;for(g=c.length;g--;)e=c[g],e.isNull||l||x||c[g+1]&&!c[g+1].isNull||a.push({plotX:e.plotX,plotY:e.plotY,doCurve:!1}),t={polarPlotY:e.polarPlotY,rectPlotX:e.rectPlotX,
yBottom:e.yBottom,plotX:r(e.plotHighX,e.plotX),plotY:e.plotHigh,isNull:e.isNull},a.push(t),b.push(t),e.isNull||l||x||c[g-1]&&!c[g-1].isNull||a.push({plotX:e.plotX,plotY:e.plotY,doCurve:!1});c=d.call(this,c);v&&(!0===v&&(v="left"),n.step={left:"right",center:"center",right:"left"}[v]);b=d.call(this,b);a=d.call(this,a);n.step=v;n=[].concat(c,b);this.chart.polar||"M"!==a[0]||(a[0]="L");this.graphPath=n;this.areaPath=c.concat(a);n.isArea=!0;n.xMap=c.xMap;this.areaPath.xMap=c.xMap;return n},drawDataLabels:function(){var c=
this.data,b=c.length,a,g=[],d=this.options.dataLabels,e=d.align,t=d.verticalAlign,n=d.inside,l,f,v=this.chart.inverted;if(d.enabled||this._hasPointLabels){for(a=b;a--;)if(l=c[a])f=n?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.y=l.high,l._plotY=l.plotY,l.plotY=l.plotHigh,g[a]=l.dataLabel,l.dataLabel=l.dataLabelUpper,l.below=f,v?e||(d.align=f?"right":"left"):t||(d.verticalAlign=f?"top":"bottom"),d.x=d.xHigh,d.y=d.yHigh;h.drawDataLabels&&h.drawDataLabels.apply(this,arguments);for(a=b;a--;)if(l=c[a])f=
n?l.plotHigh<l.plotLow:l.plotHigh>l.plotLow,l.dataLabelUpper=l.dataLabel,l.dataLabel=g[a],l.y=l.low,l.plotY=l._plotY,l.below=!f,v?e||(d.align=f?"left":"right"):t||(d.verticalAlign=f?"bottom":"top"),d.x=d.xLow,d.y=d.yLow;h.drawDataLabels&&h.drawDataLabels.apply(this,arguments)}d.align=e;d.verticalAlign=t},alignDataLabel:function(){f.column.prototype.alignDataLabel.apply(this,arguments)},drawPoints:function(){var c=this.points.length,b,a;h.drawPoints.apply(this,arguments);for(a=0;a<c;)b=this.points[a],
b.lowerGraphic=b.graphic,b.graphic=b.upperGraphic,b._plotY=b.plotY,b._plotX=b.plotX,b.plotY=b.plotHigh,u(b.plotHighX)&&(b.plotX=b.plotHighX),a++;h.drawPoints.apply(this,arguments);for(a=0;a<c;)b=this.points[a],b.upperGraphic=b.graphic,b.graphic=b.lowerGraphic,b.plotY=b._plotY,b.plotX=b._plotX,a++},setStackedPoints:a.noop},{setState:function(){var c=this.state,b=this.series,a=b.chart.polar;u(this.plotHigh)||(this.plotHigh=b.yAxis.toPixels(this.high,!0));u(this.plotLow)||(this.plotLow=this.plotY=b.yAxis.toPixels(this.low,
!0));q.setState.apply(this,arguments);this.graphic=this.upperGraphic;this.plotY=this.plotHigh;a&&(this.plotX=this.plotHighX);this.state=c;b.stateMarkerGraphic&&(b.lowerStateMarkerGraphic=b.stateMarkerGraphic,b.stateMarkerGraphic=b.upperStateMarkerGraphic);q.setState.apply(this,arguments);this.plotY=this.plotLow;this.graphic=this.lowerGraphic;a&&(this.plotX=this.plotLowX);b.stateMarkerGraphic&&(b.upperStateMarkerGraphic=b.stateMarkerGraphic,b.stateMarkerGraphic=b.lowerStateMarkerGraphic,b.lowerStateMarkerGraphic=
void 0)},haloPath:function(){var c=this.series.chart.polar,b;this.plotY=this.plotLow;c&&(this.plotX=this.plotLowX);b=q.haloPath.apply(this,arguments);this.plotY=this.plotHigh;c&&(this.plotX=this.plotHighX);return b=b.concat(q.haloPath.apply(this,arguments))},destroy:function(){this.upperGraphic&&(this.upperGraphic=this.upperGraphic.destroy());return q.destroy.apply(this,arguments)}})})(w);(function(a){var m=a.seriesType;m("areasplinerange","arearange",null,{getPointSpline:a.seriesTypes.spline.prototype.getPointSpline})})(w);
(function(a){var m=a.defaultPlotOptions,r=a.each,u=a.merge,k=a.noop,f=a.pick,h=a.seriesType,q=a.seriesTypes.column.prototype;h("columnrange","arearange",u(m.column,m.arearange,{pointRange:null,marker:null,states:{hover:{halo:!1}}}),{translate:function(){var c=this,b=c.yAxis,a=c.xAxis,g=a.startAngleRad,d,e=c.chart,t=c.xAxis.isRadial,n=Math.max(e.chartWidth,e.chartHeight)+999,l;q.translate.apply(c);r(c.points,function(p){var v=p.shapeArgs,h=c.options.minPointLength,k,x;p.plotHigh=l=Math.min(Math.max(-n,
b.translate(p.high,0,1,0,1)),n);p.plotLow=Math.min(Math.max(-n,p.plotY),n);x=l;k=f(p.rectPlotY,p.plotY)-l;Math.abs(k)<h?(h-=k,k+=h,x-=h/2):0>k&&(k*=-1,x-=k);t?(d=p.barX+g,p.shapeType="path",p.shapeArgs={d:c.polarArc(x+k,x,d,d+p.pointWidth)}):(v.height=k,v.y=x,p.tooltipPos=e.inverted?[b.len+b.pos-e.plotLeft-x-k/2,a.len+a.pos-e.plotTop-v.x-v.width/2,k]:[a.left-e.plotLeft+v.x+v.width/2,b.pos-e.plotTop+x+k/2,k])})},directTouch:!0,trackerGroups:["group","dataLabelsGroup"],drawGraph:k,getSymbol:k,crispCol:q.crispCol,
drawPoints:q.drawPoints,drawTracker:q.drawTracker,getColumnMetrics:q.getColumnMetrics,pointAttribs:q.pointAttribs,animate:function(){return q.animate.apply(this,arguments)},polarArc:function(){return q.polarArc.apply(this,arguments)},translate3dPoints:function(){return q.translate3dPoints.apply(this,arguments)},translate3dShapes:function(){return q.translate3dShapes.apply(this,arguments)}},{setState:q.pointClass.prototype.setState})})(w);(function(a){var m=a.each,r=a.isNumber,u=a.merge,k=a.pick,f=
a.pInt,h=a.Series,q=a.seriesType,c=a.TrackerMixin;q("gauge","line",{dataLabels:{enabled:!0,defer:!1,y:15,borderRadius:3,crop:!1,verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1},{angular:!0,directTouch:!0,drawGraph:a.noop,fixedBox:!0,forceDL:!0,noSharedTooltip:!0,trackerGroups:["group","dataLabelsGroup"],translate:function(){var b=this.yAxis,c=this.options,a=b.center;this.generatePoints();m(this.points,function(d){var e=u(c.dial,d.dial),g=f(k(e.radius,80))*
a[2]/200,p=f(k(e.baseLength,70))*g/100,l=f(k(e.rearLength,10))*g/100,h=e.baseWidth||3,v=e.topWidth||1,q=c.overshoot,m=b.startAngleRad+b.translate(d.y,null,null,null,!0);r(q)?(q=q/180*Math.PI,m=Math.max(b.startAngleRad-q,Math.min(b.endAngleRad+q,m))):!1===c.wrap&&(m=Math.max(b.startAngleRad,Math.min(b.endAngleRad,m)));m=180*m/Math.PI;d.shapeType="path";d.shapeArgs={d:e.path||["M",-l,-h/2,"L",p,-h/2,g,-v/2,g,v/2,p,h/2,-l,h/2,"z"],translateX:a[0],translateY:a[1],rotation:m};d.plotX=a[0];d.plotY=a[1]})},
drawPoints:function(){var b=this,c=b.yAxis.center,a=b.pivot,d=b.options,e=d.pivot,t=b.chart.renderer;m(b.points,function(c){var a=c.graphic,e=c.shapeArgs,g=e.d;u(d.dial,c.dial);a?(a.animate(e),e.d=g):c.graphic=t[c.shapeType](e).attr({rotation:e.rotation,zIndex:1}).addClass("highcharts-dial").add(b.group)});a?a.animate({translateX:c[0],translateY:c[1]}):b.pivot=t.circle(0,0,k(e.radius,5)).attr({zIndex:2}).addClass("highcharts-pivot").translate(c[0],c[1]).add(b.group)},animate:function(b){var c=this;
b||(m(c.points,function(b){var d=b.graphic;d&&(d.attr({rotation:180*c.yAxis.startAngleRad/Math.PI}),d.animate({rotation:b.shapeArgs.rotation},c.options.animation))}),c.animate=null)},render:function(){this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);h.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:function(b,c){h.prototype.setData.call(this,b,!1);this.processData();this.generatePoints();k(c,!0)&&this.chart.redraw()},
drawTracker:c&&c.drawTrackerPoint},{setState:function(b){this.state=b}})})(w);(function(a){var m=a.each,r=a.noop,u=a.seriesType,k=a.seriesTypes;u("boxplot","column",{threshold:null,tooltip:{pointFormat:'\x3cspan class\x3d"highcharts-color-{point.colorIndex}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e'},whiskerLength:"50%"},
{pointArrayMap:["low","q1","median","q3","high"],toYData:function(a){return[a.low,a.q1,a.median,a.q3,a.high]},pointValKey:"high",drawDataLabels:r,translate:function(){var a=this.yAxis,h=this.pointArrayMap;k.column.prototype.translate.apply(this);m(this.points,function(f){m(h,function(c){null!==f[c]&&(f[c+"Plot"]=a.translate(f[c],0,1,0,1))})})},drawPoints:function(){var a=this,h=a.chart.renderer,k,c,b,p,g,d,e=0,t,n,l,x,v=!1!==a.doQuartiles,r,u=a.options.whiskerLength;m(a.points,function(f){var m=f.graphic,
q=m?"animate":"attr",y=f.shapeArgs;void 0!==f.plotY&&(t=y.width,n=Math.floor(y.x),l=n+t,x=Math.round(t/2),k=Math.floor(v?f.q1Plot:f.lowPlot),c=Math.floor(v?f.q3Plot:f.lowPlot),b=Math.floor(f.highPlot),p=Math.floor(f.lowPlot),m||(f.graphic=m=h.g("point").add(a.group),f.stem=h.path().addClass("highcharts-boxplot-stem").add(m),u&&(f.whiskers=h.path().addClass("highcharts-boxplot-whisker").add(m)),v&&(f.box=h.path(void 0).addClass("highcharts-boxplot-box").add(m)),f.medianShape=h.path(void 0).addClass("highcharts-boxplot-median").add(m)),
d=f.stem.strokeWidth()%2/2,e=n+x+d,f.stem[q]({d:["M",e,c,"L",e,b,"M",e,k,"L",e,p]}),v&&(d=f.box.strokeWidth()%2/2,k=Math.floor(k)+d,c=Math.floor(c)+d,n+=d,l+=d,f.box[q]({d:["M",n,c,"L",n,k,"L",l,k,"L",l,c,"L",n,c,"z"]})),u&&(d=f.whiskers.strokeWidth()%2/2,b+=d,p+=d,r=/%$/.test(u)?x*parseFloat(u)/100:u/2,f.whiskers[q]({d:["M",e-r,b,"L",e+r,b,"M",e-r,p,"L",e+r,p]})),g=Math.round(f.medianPlot),d=f.medianShape.strokeWidth()%2/2,g+=d,f.medianShape[q]({d:["M",n,g,"L",l,g]}))})},setStackedPoints:r})})(w);
(function(a){var m=a.each,r=a.noop,u=a.seriesType,k=a.seriesTypes;u("errorbar","boxplot",{grouping:!1,linkedTo:":previous",tooltip:{pointFormat:'\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e'},whiskerWidth:null},{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a){return[a.low,a.high]},pointValKey:"high",doQuartiles:!1,drawDataLabels:k.arearange?function(){var a=this.pointValKey;
k.arearange.prototype.drawDataLabels.call(this);m(this.data,function(f){f.y=f[a]})}:r,getColumnMetrics:function(){return this.linkedParent&&this.linkedParent.columnMetrics||k.column.prototype.getColumnMetrics.call(this)}})})(w);(function(a){var m=a.correctFloat,r=a.isNumber,u=a.pick,k=a.Point,f=a.Series,h=a.seriesType,q=a.seriesTypes;h("waterfall","column",{dataLabels:{inside:!0}},{pointValKey:"y",translate:function(){var c=this.options,b=this.yAxis,a,g,d,e,f,n,l,k,v,h,r=u(c.minPointLength,5),y=r/
2,w=c.threshold,A=c.stacking,z;q.column.prototype.translate.apply(this);k=v=w;g=this.points;a=0;for(c=g.length;a<c;a++)d=g[a],l=this.processedYData[a],e=d.shapeArgs,f=A&&b.stacks[(this.negStacks&&l<w?"-":"")+this.stackKey],z=this.getStackIndicator(z,d.x,this.index),h=f?f[d.x].points[z.key]:[0,l],d.isSum?d.y=m(l):d.isIntermediateSum&&(d.y=m(l-v)),n=Math.max(k,k+d.y)+h[0],e.y=b.translate(n,0,1,0,1),d.isSum?(e.y=b.translate(h[1],0,1,0,1),e.height=Math.min(b.translate(h[0],0,1,0,1),b.len)-e.y):d.isIntermediateSum?
(e.y=b.translate(h[1],0,1,0,1),e.height=Math.min(b.translate(v,0,1,0,1),b.len)-e.y,v=h[1]):(e.height=0<l?b.translate(k,0,1,0,1)-e.y:b.translate(k,0,1,0,1)-b.translate(k-l,0,1,0,1),k+=f&&f[d.x]?f[d.x].total:l),0>e.height&&(e.y+=e.height,e.height*=-1),d.plotY=e.y=Math.round(e.y)-this.borderWidth%2/2,e.height=Math.max(Math.round(e.height),.001),d.yBottom=e.y+e.height,e.height<=r&&!d.isNull?(e.height=r,e.y-=y,d.plotY=e.y,d.minPointLengthOffset=0>d.y?-y:y):d.minPointLengthOffset=0,e=d.plotY+(d.negative?
e.height:0),this.chart.inverted?d.tooltipPos[0]=b.len-e:d.tooltipPos[1]=e},processData:function(c){var b=this.yData,a=this.options.data,g,d=b.length,e,t,n,l,k,h;t=e=n=l=this.options.threshold||0;for(h=0;h<d;h++)k=b[h],g=a&&a[h]?a[h]:{},"sum"===k||g.isSum?b[h]=m(t):"intermediateSum"===k||g.isIntermediateSum?b[h]=m(e):(t+=k,e+=k),n=Math.min(t,n),l=Math.max(t,l);f.prototype.processData.call(this,c);this.options.stacking||(this.dataMin=n,this.dataMax=l)},toYData:function(c){return c.isSum?0===c.x?null:
"sum":c.isIntermediateSum?0===c.x?null:"intermediateSum":c.y},getGraphPath:function(){return["M",0,0]},getCrispPath:function(){var c=this.data,b=c.length,a=this.graph.strokeWidth()+this.borderWidth,a=Math.round(a)%2/2,g=this.yAxis.reversed,d=[],e,f,n;for(n=1;n<b;n++){f=c[n].shapeArgs;e=c[n-1].shapeArgs;f=["M",e.x+e.width,e.y+c[n-1].minPointLengthOffset+a,"L",f.x,e.y+c[n-1].minPointLengthOffset+a];if(0>c[n-1].y&&!g||0<c[n-1].y&&g)f[2]+=e.height,f[5]+=e.height;d=d.concat(f)}return d},drawGraph:function(){f.prototype.drawGraph.call(this);
this.graph.attr({d:this.getCrispPath()})},setStackedPoints:function(){var c=this.options,b,a;f.prototype.setStackedPoints.apply(this,arguments);b=this.stackedYData?this.stackedYData.length:0;for(a=1;a<b;a++)c.data[a].isSum||c.data[a].isIntermediateSum||(this.stackedYData[a]+=this.stackedYData[a-1])},getExtremes:function(){if(this.options.stacking)return f.prototype.getExtremes.apply(this,arguments)}},{getClassName:function(){var c=k.prototype.getClassName.call(this);this.isSum?c+=" highcharts-sum":
this.isIntermediateSum&&(c+=" highcharts-intermediate-sum");return c},isValid:function(){return r(this.y,!0)||this.isSum||this.isIntermediateSum}})})(w);(function(a){var m=a.Series,r=a.seriesType,u=a.seriesTypes;r("polygon","scatter",{marker:{enabled:!1,states:{hover:{enabled:!1}}},stickyTracking:!1,tooltip:{followPointer:!0,pointFormat:""},trackByArea:!0},{type:"polygon",getGraphPath:function(){for(var a=m.prototype.getGraphPath.call(this),f=a.length+1;f--;)(f===a.length||"M"===a[f])&&0<f&&a.splice(f,
0,"z");return this.areaPath=a},drawGraph:function(){u.area.prototype.drawGraph.call(this)},drawLegendSymbol:a.LegendSymbolMixin.drawRectangle,drawTracker:m.prototype.drawTracker,setStackedPoints:a.noop})})(w);(function(a){var m=a.arrayMax,r=a.arrayMin,u=a.Axis,k=a.each,f=a.isNumber,h=a.noop,q=a.pick,c=a.pInt,b=a.Point,p=a.seriesType,g=a.seriesTypes;p("bubble","scatter",{dataLabels:{formatter:function(){return this.point.z},inside:!0,verticalAlign:"middle"},marker:{radius:null,states:{hover:{radiusPlus:0}},
symbol:"circle"},minSize:8,maxSize:"20%",softThreshold:!1,states:{hover:{halo:{size:5}}},tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},turboThreshold:0,zThreshold:0,zoneAxis:"z"},{pointArrayMap:["y","z"],parallelArrays:["x","y","z"],trackerGroups:["group","dataLabelsGroup"],specialGroup:"group",bubblePadding:!0,zoneAxis:"z",directTouch:!0,getRadii:function(b,a,c,g){var d,e,f,n=this.zData,h=[],k=this.options,p="width"!==k.sizeBy,t=k.zThreshold,m=a-b;e=0;for(d=n.length;e<d;e++)f=n[e],
k.sizeByAbsoluteValue&&null!==f&&(f=Math.abs(f-t),a=Math.max(a-t,Math.abs(b-t)),b=0),null===f?f=null:f<b?f=c/2-1:(f=0<m?(f-b)/m:.5,p&&0<=f&&(f=Math.sqrt(f)),f=Math.ceil(c+f*(g-c))/2),h.push(f);this.radii=h},animate:function(b){var a=this.options.animation;b||(k(this.points,function(b){var c=b.graphic,d;c&&c.width&&(d={x:c.x,y:c.y,width:c.width,height:c.height},c.attr({x:b.plotX,y:b.plotY,width:1,height:1}),c.animate(d,a))}),this.animate=null)},translate:function(){var b,c=this.data,h,k,l=this.radii;
g.scatter.prototype.translate.call(this);for(b=c.length;b--;)h=c[b],k=l?l[b]:0,f(k)&&k>=this.minPxSize/2?(h.marker=a.extend(h.marker,{radius:k,width:2*k,height:2*k}),h.dlBox={x:h.plotX-k,y:h.plotY-k,width:2*k,height:2*k}):h.shapeArgs=h.plotY=h.dlBox=void 0},alignDataLabel:g.column.prototype.alignDataLabel,buildKDTree:h,applyZones:h},{haloPath:function(c){return b.prototype.haloPath.call(this,0===c?0:(this.marker?this.marker.radius||0:0)+c)},ttBelow:!1});u.prototype.beforePadding=function(){var b=
this,a=this.len,g=this.chart,h=0,l=a,p=this.isXAxis,v=p?"xData":"yData",u=this.min,w={},y=Math.min(g.plotWidth,g.plotHeight),C=Number.MAX_VALUE,A=-Number.MAX_VALUE,z=this.max-u,B=a/z,D=[];k(this.series,function(a){var d=a.options;!a.bubblePadding||!a.visible&&g.options.chart.ignoreHiddenSeries||(b.allowZoomOutside=!0,D.push(a),p&&(k(["minSize","maxSize"],function(b){var a=d[b],e=/%$/.test(a),a=c(a);w[b]=e?y*a/100:a}),a.minPxSize=w.minSize,a.maxPxSize=Math.max(w.maxSize,w.minSize),a=a.zData,a.length&&
(C=q(d.zMin,Math.min(C,Math.max(r(a),!1===d.displayNegative?d.zThreshold:-Number.MAX_VALUE))),A=q(d.zMax,Math.max(A,m(a))))))});k(D,function(a){var c=a[v],d=c.length,e;p&&a.getRadii(C,A,a.minPxSize,a.maxPxSize);if(0<z)for(;d--;)f(c[d])&&b.dataMin<=c[d]&&c[d]<=b.dataMax&&(e=a.radii[d],h=Math.min((c[d]-u)*B-e,h),l=Math.max((c[d]-u)*B+e,l))});D.length&&0<z&&!this.isLog&&(l-=a,B*=(a+h-l)/a,k([["min","userMin",h],["max","userMax",l]],function(a){void 0===q(b.options[a[0]],b[a[1]])&&(b[a[0]]+=a[2]/B)}))}})(w);
(function(a){function m(a,b){var c=this.chart,g=this.options.animation,d=this.group,e=this.markerGroup,f=this.xAxis.center,h=c.plotLeft,k=c.plotTop;c.polar?c.renderer.isSVG&&(!0===g&&(g={}),b?(a={translateX:f[0]+h,translateY:f[1]+k,scaleX:.001,scaleY:.001},d.attr(a),e&&e.attr(a)):(a={translateX:h,translateY:k,scaleX:1,scaleY:1},d.animate(a,g),e&&e.animate(a,g),this.animate=null)):a.call(this,b)}var r=a.each,u=a.pick,k=a.seriesTypes,f=a.wrap,h=a.Series.prototype,q=a.Pointer.prototype;h.searchPointByAngle=
function(a){var b=this.chart,c=this.xAxis.pane.center;return this.searchKDTree({clientX:180+-180/Math.PI*Math.atan2(a.chartX-c[0]-b.plotLeft,a.chartY-c[1]-b.plotTop)})};h.getConnectors=function(a,b,f,g){var c,e,h,k,l,p,m,q;e=g?1:0;c=0<=b&&b<=a.length-1?b:0>b?a.length-1+b:0;b=0>c-1?a.length-(1+e):c-1;e=c+1>a.length-1?e:c+1;h=a[b];e=a[e];k=h.plotX;h=h.plotY;l=e.plotX;p=e.plotY;e=a[c].plotX;c=a[c].plotY;k=(1.5*e+k)/2.5;h=(1.5*c+h)/2.5;l=(1.5*e+l)/2.5;m=(1.5*c+p)/2.5;p=Math.sqrt(Math.pow(k-e,2)+Math.pow(h-
c,2));q=Math.sqrt(Math.pow(l-e,2)+Math.pow(m-c,2));k=Math.atan2(h-c,k-e);m=Math.PI/2+(k+Math.atan2(m-c,l-e))/2;Math.abs(k-m)>Math.PI/2&&(m-=Math.PI);k=e+Math.cos(m)*p;h=c+Math.sin(m)*p;l=e+Math.cos(Math.PI+m)*q;m=c+Math.sin(Math.PI+m)*q;e={rightContX:l,rightContY:m,leftContX:k,leftContY:h,plotX:e,plotY:c};f&&(e.prevPointCont=this.getConnectors(a,b,!1,g));return e};f(h,"buildKDTree",function(a){this.chart.polar&&(this.kdByAngle?this.searchPoint=this.searchPointByAngle:this.options.findNearestPointBy=
"xy");a.apply(this)});h.toXY=function(a){var b,c=this.chart,g=a.plotX;b=a.plotY;a.rectPlotX=g;a.rectPlotY=b;b=this.xAxis.postTranslate(a.plotX,this.yAxis.len-b);a.plotX=a.polarPlotX=b.x-c.plotLeft;a.plotY=a.polarPlotY=b.y-c.plotTop;this.kdByAngle?(c=(g/Math.PI*180+this.xAxis.pane.options.startAngle)%360,0>c&&(c+=360),a.clientX=c):a.clientX=a.plotX};k.spline&&(f(k.spline.prototype,"getPointSpline",function(a,b,f,g){this.chart.polar?g?(a=this.getConnectors(b,g,!0,this.connectEnds),a=["C",a.prevPointCont.rightContX,
a.prevPointCont.rightContY,a.leftContX,a.leftContY,a.plotX,a.plotY]):a=["M",f.plotX,f.plotY]:a=a.call(this,b,f,g);return a}),k.areasplinerange&&(k.areasplinerange.prototype.getPointSpline=k.spline.prototype.getPointSpline));f(h,"translate",function(a){var b=this.chart;a.call(this);if(b.polar&&(this.kdByAngle=b.tooltip&&b.tooltip.shared,!this.preventPostTranslate))for(a=this.points,b=a.length;b--;)this.toXY(a[b])});f(h,"getGraphPath",function(a,b){var c=this,g,d,e;if(this.chart.polar){b=b||this.points;
for(g=0;g<b.length;g++)if(!b[g].isNull){d=g;break}!1!==this.options.connectEnds&&void 0!==d&&(this.connectEnds=!0,b.splice(b.length,0,b[d]),e=!0);r(b,function(a){void 0===a.polarPlotY&&c.toXY(a)})}g=a.apply(this,[].slice.call(arguments,1));e&&b.pop();return g});f(h,"animate",m);k.column&&(k=k.column.prototype,k.polarArc=function(a,b,f,g){var c=this.xAxis.center,e=this.yAxis.len;return this.chart.renderer.symbols.arc(c[0],c[1],e-b,null,{start:f,end:g,innerR:e-u(a,e)})},f(k,"animate",m),f(k,"translate",
function(a){var b=this.xAxis,c=b.startAngleRad,f,d,e;this.preventPostTranslate=!0;a.call(this);if(b.isRadial)for(f=this.points,e=f.length;e--;)d=f[e],a=d.barX+c,d.shapeType="path",d.shapeArgs={d:this.polarArc(d.yBottom,d.plotY,a,a+d.pointWidth)},this.toXY(d),d.tooltipPos=[d.plotX,d.plotY],d.ttBelow=d.plotY>b.center[1]}),f(k,"alignDataLabel",function(a,b,f,g,d,e){this.chart.polar?(a=b.rectPlotX/Math.PI*180,null===g.align&&(g.align=20<a&&160>a?"left":200<a&&340>a?"right":"center"),null===g.verticalAlign&&
(g.verticalAlign=45>a||315<a?"bottom":135<a&&225>a?"top":"middle"),h.alignDataLabel.call(this,b,f,g,d,e)):a.call(this,b,f,g,d,e)}));f(q,"getCoordinates",function(a,b){var c=this.chart,f={xAxis:[],yAxis:[]};c.polar?r(c.axes,function(a){var d=a.isXAxis,g=a.center,h=b.chartX-g[0]-c.plotLeft,g=b.chartY-g[1]-c.plotTop;f[d?"xAxis":"yAxis"].push({axis:a,value:a.translate(d?Math.PI-Math.atan2(h,g):Math.sqrt(Math.pow(h,2)+Math.pow(g,2)),!0)})}):f=a.call(this,b);return f});f(a.Chart.prototype,"getAxes",function(c){this.pane||
(this.pane=[]);r(a.splat(this.options.pane),function(b){new a.Pane(b,this)},this);c.call(this)});f(a.Chart.prototype,"drawChartBox",function(a){a.call(this);r(this.pane,function(a){a.render()})});f(a.Chart.prototype,"get",function(c,b){return a.find(this.pane,function(a){return a.options.id===b})||c.call(this,b)})})(w)});
