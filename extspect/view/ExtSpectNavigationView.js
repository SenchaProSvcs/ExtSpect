Ext.define( 'extspect.view.ExtSpectNavigationView',
	{  extend : 'Ext.navigation.View',
		isExtSpectNavigationView : true,
		defaultIdPrefix : 'es-',
		isDataListGrouped : false,
		dataListStoreName : null,

		config : {     minHeight : 300,
			height : window.innerHeight, // - 100 , // '100%'
			minWidth : 300,
			width : window.innerWidth / 2,
			rootObject : Ext.Viewport
		}
	}
);
