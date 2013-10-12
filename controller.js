
var FinData = require('findata');


var mainPageApp = angular.module('mainPageApp',[]);

function MainPageCtrl($scope)
{
	$scope.ticker = "";
	$scope.stockQuoteData = "";
	$scope.getTickerInfo = function (ticker)
	{
		var findata = new FinData();
		findata.getQuote(ticker,function(data)
		{
			var fmt_data = {};
			fmt_data.name_quote = data.Name+" ("+data.Symbol+")";
			fmt_data.price		= parseFloat(data.LastTradePriceOnly).toFixed(2);
			fmt_data.change		= data.Change;
			var pct_val			= 100.0*data.Change/(data.LastTradePriceOnly-data.Change);
			fmt_data.pct_change	= pct_val.toFixed(2);
			fmt_data.exchange	= data.StockExchange;
			fmt_data.raw		= data;
			
			
	        $scope.$apply(function () {
	        	
	            $scope.stockQuoteData = fmt_data;  
	        });
		});
	};
};
mainPageApp.controller("MainPageCtrl",MainPageCtrl);
