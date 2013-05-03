Ext.define( 'uxExtSpect.view.ExtSpectNavigationView',
	{  extend : 'Ext.navigation.View',
		isExtSpectNavigationView : true,
		defaultIdPrefix : 'es-',
		isDataListGrouped : false,
		dataListStoreName : null,

		config : {
			// We populate a view.ExtSpectDataList only onPaint.
			// So initially it's empty and the height is not set properly.
			// This doesnt help fullscreen : true,
			// makes things worse :   fullscreen : true,
			minHeight : 480,
			height : '100%',
			// height : window.innerHeight, But cannot see bottom toolbar.
			minWidth : 300,
			width : '50%',
			rootObject : Ext.Viewport
		}
	}
);
