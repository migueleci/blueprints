(function () {
    var app = angular.module('modone', []);
    app.controller('plan_control', function($scope,$http) {
        $scope.array = [];
        $scope.select = "";

        $scope.loadData = function() {
            var configList = {
                method: "GET",
                url: "blueprints"
            };

            var response=$http(configList);

            response.success(function(data, status, headers, config) {
                $scope.array = data;
            });

            response.error(function(data, status, headers, config) {
                alert("The petition has failed. HTTP Status:"+status);
            });
        };
        
        $scope.consultPLane = function() {
            var figure = {
                method: "GET",
                url: "blueprints/"+$scope.select
            };
            
            var response=$http(figure);
            
            response.success(function(data, status, headers, config) {
                var cnv= document.getElementById("myCanvas");
                var ctx = cnv.getContext("2d");
                
                var fig = data;
                var points = fig.points;
                var len = points.length;
                
                var i;
                for (i=1;i<len;i++){
                    ctx.moveTo(points[i-1].x,points[i-1].y);
                    ctx.lineTo(points[i].x,points[i].y);
                    ctx.stroke();
                }
                ctx.moveTo(points[0].x,points[0].y);
                ctx.lineTo(points[len-1].x,points[len-1].y);
                ctx.stroke();
                
                //var img = data;
                //ctx.drawImage(img,10,10);
                 
            });
        };
        
        $scope.consultPLane2 = function() {
            var figure = {
                method: "GET",
                url: "blueprints/"+$scope.select
            };
            
            var response=$http(figure);
            
            response.success(function(data, status, headers, config) {
                var svgContainer= document.getElementById("mySVG");
                var c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
                c.cx.baseVal.value = 20;
                c.cy.baseVal.value = 20;
                c.r.baseVal.value = 20;
                c.style.fill = "lime";
                svgContainer.appendChild(c);
            });
        };
    });
}) ();