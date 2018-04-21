/*
 Highcharts JS v6.0.3 (2017-11-14)

 3D features for Highcharts JS

 @license: www.highcharts.com/license
*/
(function(C){"object"===typeof module&&module.exports?module.exports=C:C(Highcharts)})(function(C){(function(c){var w=c.deg2rad,y=c.pick;c.perspective=function(A,z,q){var B=z.options.chart.options3d,k=q?z.inverted:!1,v=z.plotWidth/2,n=z.plotHeight/2,u=B.depth/2,d=y(B.depth,1)*y(B.viewDistance,0),a=z.scale3d||1,h=w*B.beta*(k?-1:1),B=w*B.alpha*(k?-1:1),f=Math.cos(B),g=Math.cos(-h),b=Math.sin(B),t=Math.sin(-h);q||(v+=z.plotLeft,n+=z.plotTop);return c.map(A,function(c){var l,h;h=(k?c.y:c.x)-v;var p=(k?
c.x:c.y)-n,x=(c.z||0)-u;l=g*h-t*x;c=-b*t*h+f*p-g*b*x;h=f*t*h+b*p+f*g*x;p=0<d&&d<Number.POSITIVE_INFINITY?d/(h+u+d):1;l=l*p*a+v;c=c*p*a+n;return{x:k?c:l,y:k?l:c,z:h*a+u}})};c.pointCameraDistance=function(c,z){var q=z.options.chart.options3d,B=z.plotWidth/2;z=z.plotHeight/2;q=y(q.depth,1)*y(q.viewDistance,0)+q.depth;return Math.sqrt(Math.pow(B-c.plotX,2)+Math.pow(z-c.plotY,2)+Math.pow(q-c.plotZ,2))};c.shapeArea=function(c){var y=0,q,B;for(q=0;q<c.length;q++)B=(q+1)%c.length,y+=c[q].x*c[B].y-c[B].x*
c[q].y;return y/2};c.shapeArea3d=function(y,w,q){return c.shapeArea(c.perspective(y,w,q))}})(C);(function(c){function w(b,a,e,g,d,c,f,l){var p=[],x=c-d;return c>d&&c-d>Math.PI/2+.0001?(p=p.concat(w(b,a,e,g,d,d+Math.PI/2,f,l)),p=p.concat(w(b,a,e,g,d+Math.PI/2,c,f,l))):c<d&&d-c>Math.PI/2+.0001?(p=p.concat(w(b,a,e,g,d,d-Math.PI/2,f,l)),p=p.concat(w(b,a,e,g,d-Math.PI/2,c,f,l))):["C",b+e*Math.cos(d)-e*r*x*Math.sin(d)+f,a+g*Math.sin(d)+g*r*x*Math.cos(d)+l,b+e*Math.cos(c)+e*r*x*Math.sin(c)+f,a+g*Math.sin(c)-
g*r*x*Math.cos(c)+l,b+e*Math.cos(c)+f,a+g*Math.sin(c)+l]}var y=Math.cos,A=Math.PI,z=Math.sin,q=c.animObject,B=c.charts,k=c.color,v=c.defined,n=c.deg2rad,u=c.each,d=c.extend,a=c.inArray,h=c.map,f=c.merge,g=c.perspective,b=c.pick,t=c.SVGElement,l=c.SVGRenderer,m=c.wrap,r=4*(Math.sqrt(2)-1)/3/(A/2);m(l.prototype,"init",function(b){b.apply(this,[].slice.call(arguments,1));u([{name:"darker",slope:.6},{name:"brighter",slope:1.4}],function(b){this.definition({tagName:"filter",id:"highcharts-"+b.name,children:[{tagName:"feComponentTransfer",
children:[{tagName:"feFuncR",type:"linear",slope:b.slope},{tagName:"feFuncG",type:"linear",slope:b.slope},{tagName:"feFuncB",type:"linear",slope:b.slope}]}]})},this)});l.prototype.toLinePath=function(b,a){var e=[];u(b,function(b){e.push("L",b.x,b.y)});b.length&&(e[0]="M",a&&e.push("Z"));return e};l.prototype.toLineSegments=function(b){var a=[],e=!0;u(b,function(b){a.push(e?"M":"L",b.x,b.y);e=!e});return a};l.prototype.face3d=function(a){var d=this,e=this.createElement("path");e.vertexes=[];e.insidePlotArea=
!1;e.enabled=!0;m(e,"attr",function(a,e){if("object"===typeof e&&(v(e.enabled)||v(e.vertexes)||v(e.insidePlotArea))){this.enabled=b(e.enabled,this.enabled);this.vertexes=b(e.vertexes,this.vertexes);this.insidePlotArea=b(e.insidePlotArea,this.insidePlotArea);delete e.enabled;delete e.vertexes;delete e.insidePlotArea;var f=g(this.vertexes,B[d.chartIndex],this.insidePlotArea),l=d.toLinePath(f,!0),f=c.shapeArea(f),f=this.enabled&&0<f?"visible":"hidden";e.d=l;e.visibility=f}return a.apply(this,[].slice.call(arguments,
1))});m(e,"animate",function(a,e){if("object"===typeof e&&(v(e.enabled)||v(e.vertexes)||v(e.insidePlotArea))){this.enabled=b(e.enabled,this.enabled);this.vertexes=b(e.vertexes,this.vertexes);this.insidePlotArea=b(e.insidePlotArea,this.insidePlotArea);delete e.enabled;delete e.vertexes;delete e.insidePlotArea;var f=g(this.vertexes,B[d.chartIndex],this.insidePlotArea),l=d.toLinePath(f,!0),f=c.shapeArea(f),f=this.enabled&&0<f?"visible":"hidden";e.d=l;this.attr("visibility",f)}return a.apply(this,[].slice.call(arguments,
1))});return e.attr(a)};l.prototype.polyhedron=function(b){var a=this,e=this.g(),d=e.destroy;e.faces=[];e.destroy=function(){for(var b=0;b<e.faces.length;b++)e.faces[b].destroy();return d.call(this)};m(e,"attr",function(b,d,g,c,f){if("object"===typeof d&&v(d.faces)){for(;e.faces.length>d.faces.length;)e.faces.pop().destroy();for(;e.faces.length<d.faces.length;)e.faces.push(a.face3d().add(e));for(var l=0;l<d.faces.length;l++)e.faces[l].attr(d.faces[l],null,c,f);delete d.faces}return b.apply(this,[].slice.call(arguments,
1))});m(e,"animate",function(b,d,g,c){if(d&&d.faces){for(;e.faces.length>d.faces.length;)e.faces.pop().destroy();for(;e.faces.length<d.faces.length;)e.faces.push(a.face3d().add(e));for(var f=0;f<d.faces.length;f++)e.faces[f].animate(d.faces[f],g,c);delete d.faces}return b.apply(this,[].slice.call(arguments,1))});return e.attr(b)};l.prototype.cuboid=function(b){var a=this.g(),e=a.destroy;b=this.cuboidPath(b);a.front=this.path(b[0]).attr({"class":"highcharts-3d-front"}).add(a);a.top=this.path(b[1]).attr({"class":"highcharts-3d-top"}).add(a);
a.side=this.path(b[2]).attr({"class":"highcharts-3d-side"}).add(a);a.fillSetter=function(b){this.front.attr({fill:b});this.top.attr({fill:k(b).brighten(.1).get()});this.side.attr({fill:k(b).brighten(-.1).get()});this.color=b;a.fill=b;return this};a.opacitySetter=function(b){this.front.attr({opacity:b});this.top.attr({opacity:b});this.side.attr({opacity:b});return this};a.attr=function(b,a,e,d){if("string"===typeof b&&"undefined"!==typeof a){var f=b;b={};b[f]=a}if(b.shapeArgs||v(b.x))b=this.renderer.cuboidPath(b.shapeArgs||
b),this.front.attr({d:b[0]}),this.top.attr({d:b[1]}),this.side.attr({d:b[2]});else return t.prototype.attr.call(this,b,void 0,e,d);return this};a.animate=function(b,a,e){v(b.x)&&v(b.y)?(b=this.renderer.cuboidPath(b),this.front.animate({d:b[0]},a,e),this.top.animate({d:b[1]},a,e),this.side.animate({d:b[2]},a,e),this.attr({zIndex:-b[3]})):b.opacity?(this.front.animate(b,a,e),this.top.animate(b,a,e),this.side.animate(b,a,e)):t.prototype.animate.call(this,b,a,e);return this};a.destroy=function(){this.front.destroy();
this.top.destroy();this.side.destroy();return e.call(this)};a.attr({zIndex:-b[3]});return a};c.SVGRenderer.prototype.cuboidPath=function(b){function a(b){return q[b]}var e=b.x,d=b.y,f=b.z,l=b.height,p=b.width,n=b.depth,t=B[this.chartIndex],m,u,r=t.options.chart.options3d.alpha,k=0,q=[{x:e,y:d,z:f},{x:e+p,y:d,z:f},{x:e+p,y:d+l,z:f},{x:e,y:d+l,z:f},{x:e,y:d+l,z:f+n},{x:e+p,y:d+l,z:f+n},{x:e+p,y:d,z:f+n},{x:e,y:d,z:f+n}],q=g(q,t,b.insidePlotArea);u=function(b,e){var d=[[],-1];b=h(b,a);e=h(e,a);0>c.shapeArea(b)?
d=[b,0]:0>c.shapeArea(e)&&(d=[e,1]);return d};m=u([3,2,1,0],[7,6,5,4]);b=m[0];p=m[1];m=u([1,6,7,0],[4,5,2,3]);l=m[0];n=m[1];m=u([1,2,5,6],[0,7,4,3]);u=m[0];m=m[1];1===m?k+=1E4*(1E3-e):m||(k+=1E4*e);k+=10*(!n||0<=r&&180>=r||360>r&&357.5<r?t.plotHeight-d:10+d);1===p?k+=100*f:p||(k+=100*(1E3-f));k=-Math.round(k);return[this.toLinePath(b,!0),this.toLinePath(l,!0),this.toLinePath(u,!0),k]};c.SVGRenderer.prototype.arc3d=function(g){function c(b){var e=!1,d={};b=f(b);for(var g in b)-1!==a(g,h)&&(d[g]=b[g],
delete b[g],e=!0);return e?d:!1}var e=this.g(),l=e.renderer,h="x y r innerR start end".split(" ");g=f(g);g.alpha*=n;g.beta*=n;e.top=l.path();e.side1=l.path();e.side2=l.path();e.inn=l.path();e.out=l.path();e.onAdd=function(){var b=e.parentGroup,a=e.attr("class");e.top.add(e);u(["out","inn","side1","side2"],function(d){e[d].attr({"class":a+" highcharts-3d-side"}).add(b)})};u(["addClass","removeClass"],function(b){e[b]=function(){var a=arguments;u(["top","out","inn","side1","side2"],function(d){e[d][b].apply(e[d],
a)})}});e.setPaths=function(b){var a=e.renderer.arc3dPath(b),d=100*a.zTop;e.attribs=b;e.top.attr({d:a.top,zIndex:a.zTop});e.inn.attr({d:a.inn,zIndex:a.zInn});e.out.attr({d:a.out,zIndex:a.zOut});e.side1.attr({d:a.side1,zIndex:a.zSide1});e.side2.attr({d:a.side2,zIndex:a.zSide2});e.zIndex=d;e.attr({zIndex:d});b.center&&(e.top.setRadialReference(b.center),delete b.center)};e.setPaths(g);e.fillSetter=function(b){var a=k(b).brighten(-.1).get();this.fill=b;this.side1.attr({fill:a});this.side2.attr({fill:a});
this.inn.attr({fill:a});this.out.attr({fill:a});this.top.attr({fill:b});return this};u(["opacity","translateX","translateY","visibility"],function(b){e[b+"Setter"]=function(b,a){e[a]=b;u(["out","inn","side1","side2","top"],function(d){e[d].attr(a,b)})}});m(e,"attr",function(b,a){var f;"object"===typeof a&&(f=c(a))&&(d(e.attribs,f),e.setPaths(e.attribs));return b.apply(this,[].slice.call(arguments,1))});m(e,"animate",function(a,e,d,g){var l,h=this.attribs,m;delete e.center;delete e.z;delete e.depth;
delete e.alpha;delete e.beta;m=q(b(d,this.renderer.globalAnimation));m.duration&&(l=c(e),e.dummy=1,l&&(m.step=function(a,e){function d(a){return h[a]+(b(l[a],h[a])-h[a])*e.pos}"dummy"===e.prop&&e.elem.setPaths(f(h,{x:d("x"),y:d("y"),r:d("r"),innerR:d("innerR"),start:d("start"),end:d("end")}))}),d=m);return a.call(this,e,d,g)});e.destroy=function(){this.top.destroy();this.out.destroy();this.inn.destroy();this.side1.destroy();this.side2.destroy();t.prototype.destroy.call(this)};e.hide=function(){this.top.hide();
this.out.hide();this.inn.hide();this.side1.hide();this.side2.hide()};e.show=function(){this.top.show();this.out.show();this.inn.show();this.side1.show();this.side2.show()};return e};l.prototype.arc3dPath=function(b){function a(b){b%=2*Math.PI;b>Math.PI&&(b=2*Math.PI-b);return b}var e=b.x,d=b.y,f=b.start,g=b.end-.00001,c=b.r,l=b.innerR,h=b.depth,m=b.alpha,n=b.beta,t=Math.cos(f),u=Math.sin(f);b=Math.cos(g);var p=Math.sin(g),r=c*Math.cos(n),c=c*Math.cos(m),k=l*Math.cos(n),q=l*Math.cos(m),l=h*Math.sin(n),
B=h*Math.sin(m),h=["M",e+r*t,d+c*u],h=h.concat(w(e,d,r,c,f,g,0,0)),h=h.concat(["L",e+k*b,d+q*p]),h=h.concat(w(e,d,k,q,g,f,0,0)),h=h.concat(["Z"]),v=0<n?Math.PI/2:0,n=0<m?0:Math.PI/2,v=f>-v?f:g>-v?-v:f,D=g<A-n?g:f<A-n?A-n:g,C=2*A-n,m=["M",e+r*y(v),d+c*z(v)],m=m.concat(w(e,d,r,c,v,D,0,0));g>C&&f<C?(m=m.concat(["L",e+r*y(D)+l,d+c*z(D)+B]),m=m.concat(w(e,d,r,c,D,C,l,B)),m=m.concat(["L",e+r*y(C),d+c*z(C)]),m=m.concat(w(e,d,r,c,C,g,0,0)),m=m.concat(["L",e+r*y(g)+l,d+c*z(g)+B]),m=m.concat(w(e,d,r,c,g,C,
l,B)),m=m.concat(["L",e+r*y(C),d+c*z(C)]),m=m.concat(w(e,d,r,c,C,D,0,0))):g>A-n&&f<A-n&&(m=m.concat(["L",e+r*Math.cos(D)+l,d+c*Math.sin(D)+B]),m=m.concat(w(e,d,r,c,D,g,l,B)),m=m.concat(["L",e+r*Math.cos(g),d+c*Math.sin(g)]),m=m.concat(w(e,d,r,c,g,D,0,0)));m=m.concat(["L",e+r*Math.cos(D)+l,d+c*Math.sin(D)+B]);m=m.concat(w(e,d,r,c,D,v,l,B));m=m.concat(["Z"]);n=["M",e+k*t,d+q*u];n=n.concat(w(e,d,k,q,f,g,0,0));n=n.concat(["L",e+k*Math.cos(g)+l,d+q*Math.sin(g)+B]);n=n.concat(w(e,d,k,q,g,f,l,B));n=n.concat(["Z"]);
t=["M",e+r*t,d+c*u,"L",e+r*t+l,d+c*u+B,"L",e+k*t+l,d+q*u+B,"L",e+k*t,d+q*u,"Z"];e=["M",e+r*b,d+c*p,"L",e+r*b+l,d+c*p+B,"L",e+k*b+l,d+q*p+B,"L",e+k*b,d+q*p,"Z"];p=Math.atan2(B,-l);d=Math.abs(g+p);b=Math.abs(f+p);f=Math.abs((f+g)/2+p);d=a(d);b=a(b);f=a(f);f*=1E5;g=1E5*b;d*=1E5;return{top:h,zTop:1E5*Math.PI+1,out:m,zOut:Math.max(f,g,d),inn:n,zInn:Math.max(f,g,d),side1:t,zSide1:.99*d,side2:e,zSide2:.99*g}}})(C);(function(c){function w(c,u){var d=c.plotLeft,a=c.plotWidth+d,h=c.plotTop,f=c.plotHeight+h,
g=d+c.plotWidth/2,b=h+c.plotHeight/2,n=Number.MAX_VALUE,l=-Number.MAX_VALUE,m=Number.MAX_VALUE,r=-Number.MAX_VALUE,p,x=1;p=[{x:d,y:h,z:0},{x:d,y:h,z:u}];A([0,1],function(b){p.push({x:a,y:p[b].y,z:p[b].z})});A([0,1,2,3],function(b){p.push({x:p[b].x,y:f,z:p[b].z})});p=q(p,c,!1);A(p,function(b){n=Math.min(n,b.x);l=Math.max(l,b.x);m=Math.min(m,b.y);r=Math.max(r,b.y)});d>n&&(x=Math.min(x,1-Math.abs((d+g)/(n+g))%1));a<l&&(x=Math.min(x,(a-g)/(l-g)));h>m&&(x=0>m?Math.min(x,(h+b)/(-m+h+b)):Math.min(x,1-(h+
b)/(m+b)%1));f<r&&(x=Math.min(x,Math.abs((f-b)/(r-b))));return x}var y=c.Chart,A=c.each,z=c.merge,q=c.perspective,B=c.pick,k=c.wrap;y.prototype.is3d=function(){return this.options.chart.options3d&&this.options.chart.options3d.enabled};y.prototype.propsRequireDirtyBox.push("chart.options3d");y.prototype.propsRequireUpdateSeries.push("chart.options3d");k(y.prototype,"initSeries",function(c,u){var d=u.type||this.options.chart.type||this.options.chart.defaultSeriesType;this.is3d()&&"scatter"===d&&(u.type=
"scatter3d");return c.call(this,u)});c.wrap(c.Chart.prototype,"isInsidePlot",function(c){return this.is3d()||c.apply(this,[].slice.call(arguments,1))});var v=c.getOptions();z(!0,v,{chart:{options3d:{enabled:!1,alpha:0,beta:0,depth:100,fitToPlot:!0,viewDistance:25,axisLabelPosition:"default",frame:{visible:"default",size:1,bottom:{},top:{},left:{},right:{},back:{},front:{}}}}});k(y.prototype,"getContainer",function(c){c.apply(this,[].slice.call(arguments,1));this.renderer.definition({tagName:"style",
textContent:".highcharts-3d-top{filter: url(#highcharts-brighter)}\n.highcharts-3d-side{filter: url(#highcharts-darker)}\n"})});k(y.prototype,"setClassName",function(c){c.apply(this,[].slice.call(arguments,1));this.is3d()&&(this.container.className+=" highcharts-3d-chart")});c.wrap(c.Chart.prototype,"setChartSize",function(c){var n=this.options.chart.options3d;c.apply(this,[].slice.call(arguments,1));if(this.is3d()){var d=this.inverted,a=this.clipBox,h=this.margin;a[d?"y":"x"]=-(h[3]||0);a[d?"x":
"y"]=-(h[0]||0);a[d?"height":"width"]=this.chartWidth+(h[3]||0)+(h[1]||0);a[d?"width":"height"]=this.chartHeight+(h[0]||0)+(h[2]||0);this.scale3d=1;!0===n.fitToPlot&&(this.scale3d=w(this,n.depth))}});k(y.prototype,"redraw",function(c){this.is3d()&&(this.isDirtyBox=!0,this.frame3d=this.get3dFrame());c.apply(this,[].slice.call(arguments,1))});k(y.prototype,"render",function(c){this.is3d()&&(this.frame3d=this.get3dFrame());c.apply(this,[].slice.call(arguments,1))});k(y.prototype,"renderSeries",function(c){var n=
this.series.length;if(this.is3d())for(;n--;)c=this.series[n],c.translate(),c.render();else c.call(this)});k(y.prototype,"drawChartBox",function(n){if(this.is3d()){var u=this.renderer,d=this.options.chart.options3d,a=this.get3dFrame(),h=this.plotLeft,f=this.plotLeft+this.plotWidth,g=this.plotTop,b=this.plotTop+this.plotHeight,d=d.depth,t=h-(a.left.visible?a.left.size:0),l=f+(a.right.visible?a.right.size:0),m=g-(a.top.visible?a.top.size:0),r=b+(a.bottom.visible?a.bottom.size:0),p=0-(a.front.visible?
a.front.size:0),x=d+(a.back.visible?a.back.size:0),e=this.hasRendered?"animate":"attr";this.frame3d=a;this.frameShapes||(this.frameShapes={bottom:u.polyhedron().add(),top:u.polyhedron().add(),left:u.polyhedron().add(),right:u.polyhedron().add(),back:u.polyhedron().add(),front:u.polyhedron().add()});this.frameShapes.bottom[e]({"class":"highcharts-3d-frame highcharts-3d-frame-bottom",zIndex:a.bottom.frontFacing?-1E3:1E3,faces:[{fill:c.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:t,y:r,z:p},
{x:l,y:r,z:p},{x:l,y:r,z:x},{x:t,y:r,z:x}],enabled:a.bottom.visible},{fill:c.color(a.bottom.color).brighten(.1).get(),vertexes:[{x:h,y:b,z:d},{x:f,y:b,z:d},{x:f,y:b,z:0},{x:h,y:b,z:0}],enabled:a.bottom.visible},{fill:c.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:t,y:r,z:p},{x:t,y:r,z:x},{x:h,y:b,z:d},{x:h,y:b,z:0}],enabled:a.bottom.visible&&!a.left.visible},{fill:c.color(a.bottom.color).brighten(-.1).get(),vertexes:[{x:l,y:r,z:x},{x:l,y:r,z:p},{x:f,y:b,z:0},{x:f,y:b,z:d}],enabled:a.bottom.visible&&
!a.right.visible},{fill:c.color(a.bottom.color).get(),vertexes:[{x:l,y:r,z:p},{x:t,y:r,z:p},{x:h,y:b,z:0},{x:f,y:b,z:0}],enabled:a.bottom.visible&&!a.front.visible},{fill:c.color(a.bottom.color).get(),vertexes:[{x:t,y:r,z:x},{x:l,y:r,z:x},{x:f,y:b,z:d},{x:h,y:b,z:d}],enabled:a.bottom.visible&&!a.back.visible}]});this.frameShapes.top[e]({"class":"highcharts-3d-frame highcharts-3d-frame-top",zIndex:a.top.frontFacing?-1E3:1E3,faces:[{fill:c.color(a.top.color).brighten(.1).get(),vertexes:[{x:t,y:m,z:x},
{x:l,y:m,z:x},{x:l,y:m,z:p},{x:t,y:m,z:p}],enabled:a.top.visible},{fill:c.color(a.top.color).brighten(.1).get(),vertexes:[{x:h,y:g,z:0},{x:f,y:g,z:0},{x:f,y:g,z:d},{x:h,y:g,z:d}],enabled:a.top.visible},{fill:c.color(a.top.color).brighten(-.1).get(),vertexes:[{x:t,y:m,z:x},{x:t,y:m,z:p},{x:h,y:g,z:0},{x:h,y:g,z:d}],enabled:a.top.visible&&!a.left.visible},{fill:c.color(a.top.color).brighten(-.1).get(),vertexes:[{x:l,y:m,z:p},{x:l,y:m,z:x},{x:f,y:g,z:d},{x:f,y:g,z:0}],enabled:a.top.visible&&!a.right.visible},
{fill:c.color(a.top.color).get(),vertexes:[{x:t,y:m,z:p},{x:l,y:m,z:p},{x:f,y:g,z:0},{x:h,y:g,z:0}],enabled:a.top.visible&&!a.front.visible},{fill:c.color(a.top.color).get(),vertexes:[{x:l,y:m,z:x},{x:t,y:m,z:x},{x:h,y:g,z:d},{x:f,y:g,z:d}],enabled:a.top.visible&&!a.back.visible}]});this.frameShapes.left[e]({"class":"highcharts-3d-frame highcharts-3d-frame-left",zIndex:a.left.frontFacing?-1E3:1E3,faces:[{fill:c.color(a.left.color).brighten(.1).get(),vertexes:[{x:t,y:r,z:p},{x:h,y:b,z:0},{x:h,y:b,
z:d},{x:t,y:r,z:x}],enabled:a.left.visible&&!a.bottom.visible},{fill:c.color(a.left.color).brighten(.1).get(),vertexes:[{x:t,y:m,z:x},{x:h,y:g,z:d},{x:h,y:g,z:0},{x:t,y:m,z:p}],enabled:a.left.visible&&!a.top.visible},{fill:c.color(a.left.color).brighten(-.1).get(),vertexes:[{x:t,y:r,z:x},{x:t,y:m,z:x},{x:t,y:m,z:p},{x:t,y:r,z:p}],enabled:a.left.visible},{fill:c.color(a.left.color).brighten(-.1).get(),vertexes:[{x:h,y:g,z:d},{x:h,y:b,z:d},{x:h,y:b,z:0},{x:h,y:g,z:0}],enabled:a.left.visible},{fill:c.color(a.left.color).get(),
vertexes:[{x:t,y:r,z:p},{x:t,y:m,z:p},{x:h,y:g,z:0},{x:h,y:b,z:0}],enabled:a.left.visible&&!a.front.visible},{fill:c.color(a.left.color).get(),vertexes:[{x:t,y:m,z:x},{x:t,y:r,z:x},{x:h,y:b,z:d},{x:h,y:g,z:d}],enabled:a.left.visible&&!a.back.visible}]});this.frameShapes.right[e]({"class":"highcharts-3d-frame highcharts-3d-frame-right",zIndex:a.right.frontFacing?-1E3:1E3,faces:[{fill:c.color(a.right.color).brighten(.1).get(),vertexes:[{x:l,y:r,z:x},{x:f,y:b,z:d},{x:f,y:b,z:0},{x:l,y:r,z:p}],enabled:a.right.visible&&
!a.bottom.visible},{fill:c.color(a.right.color).brighten(.1).get(),vertexes:[{x:l,y:m,z:p},{x:f,y:g,z:0},{x:f,y:g,z:d},{x:l,y:m,z:x}],enabled:a.right.visible&&!a.top.visible},{fill:c.color(a.right.color).brighten(-.1).get(),vertexes:[{x:f,y:g,z:0},{x:f,y:b,z:0},{x:f,y:b,z:d},{x:f,y:g,z:d}],enabled:a.right.visible},{fill:c.color(a.right.color).brighten(-.1).get(),vertexes:[{x:l,y:r,z:p},{x:l,y:m,z:p},{x:l,y:m,z:x},{x:l,y:r,z:x}],enabled:a.right.visible},{fill:c.color(a.right.color).get(),vertexes:[{x:l,
y:m,z:p},{x:l,y:r,z:p},{x:f,y:b,z:0},{x:f,y:g,z:0}],enabled:a.right.visible&&!a.front.visible},{fill:c.color(a.right.color).get(),vertexes:[{x:l,y:r,z:x},{x:l,y:m,z:x},{x:f,y:g,z:d},{x:f,y:b,z:d}],enabled:a.right.visible&&!a.back.visible}]});this.frameShapes.back[e]({"class":"highcharts-3d-frame highcharts-3d-frame-back",zIndex:a.back.frontFacing?-1E3:1E3,faces:[{fill:c.color(a.back.color).brighten(.1).get(),vertexes:[{x:l,y:r,z:x},{x:t,y:r,z:x},{x:h,y:b,z:d},{x:f,y:b,z:d}],enabled:a.back.visible&&
!a.bottom.visible},{fill:c.color(a.back.color).brighten(.1).get(),vertexes:[{x:t,y:m,z:x},{x:l,y:m,z:x},{x:f,y:g,z:d},{x:h,y:g,z:d}],enabled:a.back.visible&&!a.top.visible},{fill:c.color(a.back.color).brighten(-.1).get(),vertexes:[{x:t,y:r,z:x},{x:t,y:m,z:x},{x:h,y:g,z:d},{x:h,y:b,z:d}],enabled:a.back.visible&&!a.left.visible},{fill:c.color(a.back.color).brighten(-.1).get(),vertexes:[{x:l,y:m,z:x},{x:l,y:r,z:x},{x:f,y:b,z:d},{x:f,y:g,z:d}],enabled:a.back.visible&&!a.right.visible},{fill:c.color(a.back.color).get(),
vertexes:[{x:h,y:g,z:d},{x:f,y:g,z:d},{x:f,y:b,z:d},{x:h,y:b,z:d}],enabled:a.back.visible},{fill:c.color(a.back.color).get(),vertexes:[{x:t,y:r,z:x},{x:l,y:r,z:x},{x:l,y:m,z:x},{x:t,y:m,z:x}],enabled:a.back.visible}]});this.frameShapes.front[e]({"class":"highcharts-3d-frame highcharts-3d-frame-front",zIndex:a.front.frontFacing?-1E3:1E3,faces:[{fill:c.color(a.front.color).brighten(.1).get(),vertexes:[{x:t,y:r,z:p},{x:l,y:r,z:p},{x:f,y:b,z:0},{x:h,y:b,z:0}],enabled:a.front.visible&&!a.bottom.visible},
{fill:c.color(a.front.color).brighten(.1).get(),vertexes:[{x:l,y:m,z:p},{x:t,y:m,z:p},{x:h,y:g,z:0},{x:f,y:g,z:0}],enabled:a.front.visible&&!a.top.visible},{fill:c.color(a.front.color).brighten(-.1).get(),vertexes:[{x:t,y:m,z:p},{x:t,y:r,z:p},{x:h,y:b,z:0},{x:h,y:g,z:0}],enabled:a.front.visible&&!a.left.visible},{fill:c.color(a.front.color).brighten(-.1).get(),vertexes:[{x:l,y:r,z:p},{x:l,y:m,z:p},{x:f,y:g,z:0},{x:f,y:b,z:0}],enabled:a.front.visible&&!a.right.visible},{fill:c.color(a.front.color).get(),
vertexes:[{x:f,y:g,z:0},{x:h,y:g,z:0},{x:h,y:b,z:0},{x:f,y:b,z:0}],enabled:a.front.visible},{fill:c.color(a.front.color).get(),vertexes:[{x:l,y:r,z:p},{x:t,y:r,z:p},{x:t,y:m,z:p},{x:l,y:m,z:p}],enabled:a.front.visible}]})}return n.apply(this,[].slice.call(arguments,1))});y.prototype.retrieveStacks=function(c){var n=this.series,d={},a,h=1;A(this.series,function(f){a=B(f.options.stack,c?0:n.length-1-f.index);d[a]?d[a].series.push(f):(d[a]={series:[f],position:h},h++)});d.totalStacks=h+1;return d};y.prototype.get3dFrame=
function(){var n=this,u=n.options.chart.options3d,d=u.frame,a=n.plotLeft,h=n.plotLeft+n.plotWidth,f=n.plotTop,g=n.plotTop+n.plotHeight,b=u.depth,t=function(b){b=c.shapeArea3d(b,n);return.5<b?1:-.5>b?-1:0},l=t([{x:a,y:g,z:b},{x:h,y:g,z:b},{x:h,y:g,z:0},{x:a,y:g,z:0}]),m=t([{x:a,y:f,z:0},{x:h,y:f,z:0},{x:h,y:f,z:b},{x:a,y:f,z:b}]),r=t([{x:a,y:f,z:0},{x:a,y:f,z:b},{x:a,y:g,z:b},{x:a,y:g,z:0}]),p=t([{x:h,y:f,z:b},{x:h,y:f,z:0},{x:h,y:g,z:0},{x:h,y:g,z:b}]),x=t([{x:a,y:g,z:0},{x:h,y:g,z:0},{x:h,y:f,z:0},
{x:a,y:f,z:0}]),t=t([{x:a,y:f,z:b},{x:h,y:f,z:b},{x:h,y:g,z:b},{x:a,y:g,z:b}]),e=!1,k=!1,v=!1,y=!1;A([].concat(n.xAxis,n.yAxis,n.zAxis),function(b){b&&(b.horiz?b.opposite?k=!0:e=!0:b.opposite?y=!0:v=!0)});var w=function(b,a,d){for(var e=["size","color","visible"],c={},g=0;g<e.length;g++)for(var f=e[g],l=0;l<b.length;l++)if("object"===typeof b[l]){var m=b[l][f];if(void 0!==m&&null!==m){c[f]=m;break}}b=d;!0===c.visible||!1===c.visible?b=c.visible:"auto"===c.visible&&(b=0<a);return{size:B(c.size,1),
color:B(c.color,"none"),frontFacing:0<a,visible:b}},d={bottom:w([d.bottom,d.top,d],l,e),top:w([d.top,d.bottom,d],m,k),left:w([d.left,d.right,d.side,d],r,v),right:w([d.right,d.left,d.side,d],p,y),back:w([d.back,d.front,d],t,!0),front:w([d.front,d.back,d],x,!1)};"auto"===u.axisLabelPosition?(p=function(b,a){return b.visible!==a.visible||b.visible&&a.visible&&b.frontFacing!==a.frontFacing},u=[],p(d.left,d.front)&&u.push({y:(f+g)/2,x:a,z:0,xDir:{x:1,y:0,z:0}}),p(d.left,d.back)&&u.push({y:(f+g)/2,x:a,
z:b,xDir:{x:0,y:0,z:-1}}),p(d.right,d.front)&&u.push({y:(f+g)/2,x:h,z:0,xDir:{x:0,y:0,z:1}}),p(d.right,d.back)&&u.push({y:(f+g)/2,x:h,z:b,xDir:{x:-1,y:0,z:0}}),l=[],p(d.bottom,d.front)&&l.push({x:(a+h)/2,y:g,z:0,xDir:{x:1,y:0,z:0}}),p(d.bottom,d.back)&&l.push({x:(a+h)/2,y:g,z:b,xDir:{x:-1,y:0,z:0}}),m=[],p(d.top,d.front)&&m.push({x:(a+h)/2,y:f,z:0,xDir:{x:1,y:0,z:0}}),p(d.top,d.back)&&m.push({x:(a+h)/2,y:f,z:b,xDir:{x:-1,y:0,z:0}}),r=[],p(d.bottom,d.left)&&r.push({z:(0+b)/2,y:g,x:a,xDir:{x:0,y:0,
z:-1}}),p(d.bottom,d.right)&&r.push({z:(0+b)/2,y:g,x:h,xDir:{x:0,y:0,z:1}}),g=[],p(d.top,d.left)&&g.push({z:(0+b)/2,y:f,x:a,xDir:{x:0,y:0,z:-1}}),p(d.top,d.right)&&g.push({z:(0+b)/2,y:f,x:h,xDir:{x:0,y:0,z:1}}),a=function(b,a,d){if(0===b.length)return null;if(1===b.length)return b[0];for(var e=0,c=q(b,n,!1),g=1;g<c.length;g++)d*c[g][a]>d*c[e][a]?e=g:d*c[g][a]===d*c[e][a]&&c[g].z<c[e].z&&(e=g);return b[e]},d.axes={y:{left:a(u,"x",-1),right:a(u,"x",1)},x:{top:a(m,"y",-1),bottom:a(l,"y",1)},z:{top:a(g,
"y",-1),bottom:a(r,"y",1)}}):d.axes={y:{left:{x:a,z:0,xDir:{x:1,y:0,z:0}},right:{x:h,z:0,xDir:{x:0,y:0,z:1}}},x:{top:{y:f,z:0,xDir:{x:1,y:0,z:0}},bottom:{y:g,z:0,xDir:{x:1,y:0,z:0}}},z:{top:{x:v?h:a,y:f,xDir:v?{x:0,y:0,z:1}:{x:0,y:0,z:-1}},bottom:{x:v?h:a,y:g,xDir:v?{x:0,y:0,z:1}:{x:0,y:0,z:-1}}}};return d};c.Fx.prototype.matrixSetter=function(){var n;if(1>this.pos&&(c.isArray(this.start)||c.isArray(this.end))){var u=this.start||[1,0,0,1,0,0],d=this.end||[1,0,0,1,0,0];n=[];for(var a=0;6>a;a++)n.push(this.pos*
d[a]+(1-this.pos)*u[a])}else n=this.end;this.elem.attr(this.prop,n,null,!0)}})(C);(function(c){function w(a,b,c){if(!a.chart.is3d()||"colorAxis"===a.coll)return b;var f=a.chart,g=q*f.options.chart.options3d.alpha,h=q*f.options.chart.options3d.beta,t=u(c&&a.options.title.position3d,a.options.labels.position3d);c=u(c&&a.options.title.skew3d,a.options.labels.skew3d);var k=f.frame3d,e=f.plotLeft,B=f.plotWidth+e,v=f.plotTop,y=f.plotHeight+v,f=!1,w=0,A=0,z={x:0,y:1,z:0};b=a.swapZ({x:b.x,y:b.y,z:0});if(a.isZAxis)if(a.opposite){if(null===
k.axes.z.top)return{};A=b.y-v;b.x=k.axes.z.top.x;b.y=k.axes.z.top.y;e=k.axes.z.top.xDir;f=!k.top.frontFacing}else{if(null===k.axes.z.bottom)return{};A=b.y-y;b.x=k.axes.z.bottom.x;b.y=k.axes.z.bottom.y;e=k.axes.z.bottom.xDir;f=!k.bottom.frontFacing}else if(a.horiz)if(a.opposite){if(null===k.axes.x.top)return{};A=b.y-v;b.y=k.axes.x.top.y;b.z=k.axes.x.top.z;e=k.axes.x.top.xDir;f=!k.top.frontFacing}else{if(null===k.axes.x.bottom)return{};A=b.y-y;b.y=k.axes.x.bottom.y;b.z=k.axes.x.bottom.z;e=k.axes.x.bottom.xDir;
f=!k.bottom.frontFacing}else if(a.opposite){if(null===k.axes.y.right)return{};w=b.x-B;b.x=k.axes.y.right.x;b.z=k.axes.y.right.z;e=k.axes.y.right.xDir;e={x:e.z,y:e.y,z:-e.x}}else{if(null===k.axes.y.left)return{};w=b.x-e;b.x=k.axes.y.left.x;b.z=k.axes.y.left.z;e=k.axes.y.left.xDir}"chart"!==t&&("flap"===t?a.horiz?(h=Math.sin(g),g=Math.cos(g),a.opposite&&(h=-h),f&&(h=-h),z={x:e.z*h,y:g,z:-e.x*h}):e={x:Math.cos(h),y:0,z:Math.sin(h)}:"ortho"===t?a.horiz?(z=Math.cos(g),t=Math.sin(h)*z,g=-Math.sin(g),h=
-z*Math.cos(h),z={x:e.y*h-e.z*g,y:e.z*t-e.x*h,z:e.x*g-e.y*t},g=1/Math.sqrt(z.x*z.x+z.y*z.y+z.z*z.z),f&&(g=-g),z={x:g*z.x,y:g*z.y,z:g*z.z}):e={x:Math.cos(h),y:0,z:Math.sin(h)}:a.horiz?z={x:Math.sin(h)*Math.sin(g),y:Math.cos(g),z:-Math.cos(h)*Math.sin(g)}:e={x:Math.cos(h),y:0,z:Math.sin(h)});b.x+=w*e.x+A*z.x;b.y+=w*e.y+A*z.y;b.z+=w*e.z+A*z.z;f=n([b],a.chart)[0];c?(0>d(n([b,{x:b.x+e.x,y:b.y+e.y,z:b.z+e.z},{x:b.x+z.x,y:b.y+z.y,z:b.z+z.z}],a.chart))&&(e={x:-e.x,y:-e.y,z:-e.z}),a=n([{x:b.x,y:b.y,z:b.z},
{x:b.x+e.x,y:b.y+e.y,z:b.z+e.z},{x:b.x+z.x,y:b.y+z.y,z:b.z+z.z}],a.chart),f.matrix=[a[1].x-a[0].x,a[1].y-a[0].y,a[2].x-a[0].x,a[2].y-a[0].y,f.x,f.y],f.matrix[4]-=f.x*f.matrix[0]+f.y*f.matrix[2],f.matrix[5]-=f.x*f.matrix[1]+f.y*f.matrix[3]):f.matrix=null;return f}var y,A=c.Axis,z=c.Chart,q=c.deg2rad,B=c.each,k=c.extend,v=c.merge,n=c.perspective,u=c.pick,d=c.shapeArea,a=c.splat,h=c.Tick,f=c.wrap;v(!0,A.prototype.defaultOptions,{labels:{position3d:"offset",skew3d:!1},title:{position3d:null,skew3d:null}});
f(A.prototype,"setOptions",function(a,b){a.call(this,b);this.chart.is3d&&this.chart.is3d()&&"colorAxis"!==this.coll&&(a=this.options,a.tickWidth=u(a.tickWidth,0),a.gridLineWidth=u(a.gridLineWidth,1))});f(A.prototype,"getPlotLinePath",function(a){var b=a.apply(this,[].slice.call(arguments,1));if(!this.chart.is3d()||"colorAxis"===this.coll||null===b)return b;var d=this.chart,c=d.options.chart.options3d,c=this.isZAxis?d.plotWidth:c.depth,d=d.frame3d,b=[this.swapZ({x:b[1],y:b[2],z:0}),this.swapZ({x:b[1],
y:b[2],z:c}),this.swapZ({x:b[4],y:b[5],z:0}),this.swapZ({x:b[4],y:b[5],z:c})],c=[];this.horiz?(this.isZAxis?(d.left.visible&&c.push(b[0],b[2]),d.right.visible&&c.push(b[1],b[3])):(d.front.visible&&c.push(b[0],b[2]),d.back.visible&&c.push(b[1],b[3])),d.top.visible&&c.push(b[0],b[1]),d.bottom.visible&&c.push(b[2],b[3])):(d.front.visible&&c.push(b[0],b[2]),d.back.visible&&c.push(b[1],b[3]),d.left.visible&&c.push(b[0],b[1]),d.right.visible&&c.push(b[2],b[3]));c=n(c,this.chart,!1);return this.chart.renderer.toLineSegments(c)});
f(A.prototype,"getLinePath",function(a){return this.chart.is3d()&&"colorAxis"!==this.coll?[]:a.apply(this,[].slice.call(arguments,1))});f(A.prototype,"getPlotBandPath",function(a){if(!this.chart.is3d()||"colorAxis"===this.coll)return a.apply(this,[].slice.call(arguments,1));var b=arguments,d=b[2],c=[],b=this.getPlotLinePath(b[1]),d=this.getPlotLinePath(d);if(b&&d)for(var f=0;f<b.length;f+=6)c.push("M",b[f+1],b[f+2],"L",b[f+4],b[f+5],"L",d[f+4],d[f+5],"L",d[f+1],d[f+2],"Z");return c});f(h.prototype,
"getMarkPath",function(a){var b=a.apply(this,[].slice.call(arguments,1)),b=[w(this.axis,{x:b[1],y:b[2],z:0}),w(this.axis,{x:b[4],y:b[5],z:0})];return this.axis.chart.renderer.toLineSegments(b)});f(h.prototype,"getLabelPosition",function(a){var b=a.apply(this,[].slice.call(arguments,1));return w(this.axis,b)});f(A.prototype,"getTitlePosition",function(a){var b=a.apply(this,[].slice.call(arguments,1));return w(this,b,!0)});f(A.prototype,"drawCrosshair",function(a){var b=arguments;this.chart.is3d()&&
"colorAxis"!==this.coll&&b[2]&&(b[2]={plotX:b[2].plotXold||b[2].plotX,plotY:b[2].plotYold||b[2].plotY});a.apply(this,[].slice.call(b,1))});f(A.prototype,"destroy",function(a){B(["backFrame","bottomFrame","sideFrame"],function(b){this[b]&&(this[b]=this[b].destroy())},this);a.apply(this,[].slice.call(arguments,1))});A.prototype.swapZ=function(a,b){return this.isZAxis?(b=b?0:this.chart.plotLeft,{x:b+a.z,y:a.y,z:a.x-b}):a};y=c.ZAxis=function(){this.init.apply(this,arguments)};k(y.prototype,A.prototype);
k(y.prototype,{isZAxis:!0,setOptions:function(a){a=v({offset:0,lineWidth:0},a);A.prototype.setOptions.call(this,a);this.coll="zAxis"},setAxisSize:function(){A.prototype.setAxisSize.call(this);this.width=this.len=this.chart.options.chart.options3d.depth;this.right=this.chart.chartWidth-this.width-this.left},getSeriesExtremes:function(){var a=this,b=a.chart;a.hasVisibleSeries=!1;a.dataMin=a.dataMax=a.ignoreMinPadding=a.ignoreMaxPadding=null;a.buildStacks&&a.buildStacks();B(a.series,function(d){if(d.visible||
!b.options.chart.ignoreHiddenSeries)a.hasVisibleSeries=!0,d=d.zData,d.length&&(a.dataMin=Math.min(u(a.dataMin,d[0]),Math.min.apply(null,d)),a.dataMax=Math.max(u(a.dataMax,d[0]),Math.max.apply(null,d)))})}});f(z.prototype,"getAxes",function(d){var b=this,c=this.options,c=c.zAxis=a(c.zAxis||{});d.call(this);b.is3d()&&(this.zAxis=[],B(c,function(a,d){a.index=d;a.isX=!0;(new y(b,a)).setScale()}))})})(C);(function(c){var w=c.perspective,y=c.pick,A=c.wrap;A(c.Series.prototype,"translate",function(c){c.apply(this,
[].slice.call(arguments,1));this.chart.is3d()&&this.translate3dPoints()});c.Series.prototype.translate3dPoints=function(){var c=this.chart,q=y(this.zAxis,c.options.zAxis[0]),B=[],k,v,n;for(n=0;n<this.data.length;n++)k=this.data[n],q&&q.translate&&(v=q.isLog&&q.val2lin?q.val2lin(k.z):k.z,k.plotZ=q.translate(v),k.isInside=k.isInside?v>=q.min&&v<=q.max:!1),B.push({x:y(k.plotXold,k.plotX),y:y(k.plotYold,k.plotY),z:y(k.plotZold,k.plotZ)});c=w(B,c,!0);for(n=0;n<this.data.length;n++)k=this.data[n],q=c[n],
k.plotXold=k.plotX,k.plotYold=k.plotY,k.plotZold=k.plotZ,k.plotX=q.x,k.plotY=q.y,k.plotZ=q.z}})(C);(function(c){var w=c.each,y=c.perspective,A=c.pick,z=c.Series,q=c.seriesTypes,B=c.inArray,k=c.svg,v=c.wrap;v(q.column.prototype,"translate",function(c){c.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&this.translate3dShapes()});q.column.prototype.translate3dPoints=function(){};q.column.prototype.translate3dShapes=function(){var c=this,k=c.chart,d=c.options,a=d.depth||25,h=(d.stacking?d.stack||
0:c.index)*(a+(d.groupZPadding||1)),f=c.borderWidth%2?.5:0;k.inverted&&!c.yAxis.reversed&&(f*=-1);!1!==d.grouping&&(h=0);h+=d.groupZPadding||1;w(c.data,function(d){if(null!==d.y){var b=d.shapeArgs,g=d.tooltipPos,l;w([["x","width"],["y","height"]],function(a){l=b[a[0]]-f;0>l&&(b[a[1]]+=b[a[0]]+f,b[a[0]]=-f,l=0);l+b[a[1]]>c[a[0]+"Axis"].len&&0!==b[a[1]]&&(b[a[1]]=c[a[0]+"Axis"].len-b[a[0]]);if(0!==b[a[1]]&&(b[a[0]]>=c[a[0]+"Axis"].len||b[a[0]]+b[a[1]]<=f))for(var d in b)b[d]=0});d.shapeType="cuboid";
b.z=h;b.depth=a;b.insidePlotArea=!0;g=y([{x:g[0],y:g[1],z:h}],k,!0)[0];d.tooltipPos=[g.x,g.y]}});c.z=h};v(q.column.prototype,"animate",function(c){if(this.chart.is3d()){var n=arguments[1],d=this.yAxis,a=this,h=this.yAxis.reversed;k&&(n?w(a.data,function(a){null!==a.y&&(a.height=a.shapeArgs.height,a.shapey=a.shapeArgs.y,a.shapeArgs.height=1,h||(a.shapeArgs.y=a.stackY?a.plotY+d.translate(a.stackY):a.plotY+(a.negative?-a.height:a.height)))}):(w(a.data,function(d){null!==d.y&&(d.shapeArgs.height=d.height,
d.shapeArgs.y=d.shapey,d.graphic&&d.graphic.animate(d.shapeArgs,a.options.animation))}),this.drawDataLabels(),a.animate=null))}else c.apply(this,[].slice.call(arguments,1))});v(q.column.prototype,"plotGroup",function(c,k,d,a,h,f){this.chart.is3d()&&f&&!this[k]&&(this.chart.columnGroup||(this.chart.columnGroup=this.chart.renderer.g("columnGroup").add(f)),this[k]=this.chart.columnGroup,this.chart.columnGroup.attr(this.getPlotBox()),this[k].survive=!0);return c.apply(this,Array.prototype.slice.call(arguments,
1))});v(q.column.prototype,"setVisible",function(c,k){var d=this,a;d.chart.is3d()&&w(d.data,function(c){a=(c.visible=c.options.visible=k=void 0===k?!c.visible:k)?"visible":"hidden";d.options.data[B(c,d.data)]=c.options;c.graphic&&c.graphic.attr({visibility:a})});c.apply(this,Array.prototype.slice.call(arguments,1))});v(q.column.prototype,"init",function(c){c.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var k=this.options,d=k.grouping,a=k.stacking,h=A(this.yAxis.options.reversedStacks,
!0),f=0;if(void 0===d||d){d=this.chart.retrieveStacks(a);f=k.stack||0;for(a=0;a<d[f].series.length&&d[f].series[a]!==this;a++);f=10*(d.totalStacks-d[f].position)+(h?a:-a);this.xAxis.reversed||(f=10*d.totalStacks-f)}k.zIndex=f}});v(z.prototype,"alignDataLabel",function(c){if(this.chart.is3d()&&("column"===this.type||"columnrange"===this.type)){var k=arguments[4],d={x:k.x,y:k.y,z:this.z},d=y([d],this.chart,!0)[0];k.x=d.x;k.y=d.y}c.apply(this,[].slice.call(arguments,1))});v(c.StackItem.prototype,"getStackBox",
function(k,q){var d=k.apply(this,[].slice.call(arguments,1));if(q.is3d()){var a={x:d.x,y:d.y,z:0},a=c.perspective([a],q,!0)[0];d.x=a.x;d.y=a.y}return d})})(C);(function(c){var w=c.deg2rad,y=c.each,A=c.seriesTypes,z=c.svg;c=c.wrap;c(A.pie.prototype,"translate",function(c){c.apply(this,[].slice.call(arguments,1));if(this.chart.is3d()){var q=this,k=q.options,v=k.depth||0,n=q.chart.options.chart.options3d,u=n.alpha,d=n.beta,a=k.stacking?(k.stack||0)*v:q._i*v,a=a+v/2;!1!==k.grouping&&(a=0);y(q.data,function(c){var f=
c.shapeArgs;c.shapeType="arc3d";f.z=a;f.depth=.75*v;f.alpha=u;f.beta=d;f.center=q.center;f=(f.end+f.start)/2;c.slicedTranslation={translateX:Math.round(Math.cos(f)*k.slicedOffset*Math.cos(u*w)),translateY:Math.round(Math.sin(f)*k.slicedOffset*Math.cos(u*w))}})}});c(A.pie.prototype.pointClass.prototype,"haloPath",function(c){var q=arguments;return this.series.chart.is3d()?[]:c.call(this,q[1])});c(A.pie.prototype,"drawPoints",function(c){c.apply(this,[].slice.call(arguments,1));this.chart.is3d()&&y(this.points,
function(c){var k=c.graphic;if(k)k[c.y&&c.visible?"show":"hide"]()})});c(A.pie.prototype,"drawDataLabels",function(c){if(this.chart.is3d()){var q=this.chart.options.chart.options3d;y(this.data,function(c){var k=c.shapeArgs,n=k.r,u=(k.start+k.end)/2,d=c.labelPos,a=-n*(1-Math.cos((k.alpha||q.alpha)*w))*Math.sin(u),h=n*(Math.cos((k.beta||q.beta)*w)-1)*Math.cos(u);y([0,2,4],function(c){d[c]+=h;d[c+1]+=a})})}c.apply(this,[].slice.call(arguments,1))});c(A.pie.prototype,"addPoint",function(c){c.apply(this,
[].slice.call(arguments,1));this.chart.is3d()&&this.update(this.userOptions,!0)});c(A.pie.prototype,"animate",function(c){if(this.chart.is3d()){var q=arguments[1],k=this.options.animation,v=this.center,n=this.group,u=this.markerGroup;z&&(!0===k&&(k={}),q?(n.oldtranslateX=n.translateX,n.oldtranslateY=n.translateY,q={translateX:v[0],translateY:v[1],scaleX:.001,scaleY:.001},n.attr(q),u&&(u.attrSetters=n.attrSetters,u.attr(q))):(q={translateX:n.oldtranslateX,translateY:n.oldtranslateY,scaleX:1,scaleY:1},
n.animate(q,k),u&&u.animate(q,k),this.animate=null))}else c.apply(this,[].slice.call(arguments,1))})})(C);(function(c){var w=c.Point,y=c.seriesType,A=c.seriesTypes;y("scatter3d","scatter",{tooltip:{pointFormat:"x: \x3cb\x3e{point.x}\x3c/b\x3e\x3cbr/\x3ey: \x3cb\x3e{point.y}\x3c/b\x3e\x3cbr/\x3ez: \x3cb\x3e{point.z}\x3c/b\x3e\x3cbr/\x3e"}},{pointAttribs:function(w){var q=A.scatter.prototype.pointAttribs.apply(this,arguments);this.chart.is3d()&&w&&(q.zIndex=c.pointCameraDistance(w,this.chart));return q},
axisTypes:["xAxis","yAxis","zAxis"],pointArrayMap:["x","y","z"],parallelArrays:["x","y","z"],directTouch:!0},{applyOptions:function(){w.prototype.applyOptions.apply(this,arguments);void 0===this.z&&(this.z=0);return this}})})(C)});
