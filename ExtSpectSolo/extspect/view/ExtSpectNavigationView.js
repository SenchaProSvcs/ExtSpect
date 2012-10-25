Ext.define( 'extspect.view.ExtSpectNavigationView',
	{  extend : 'Ext.navigation.View',
		isExtSpectNavigationView : true,
		defaultIdPrefix : 'es-',
		isDataListGrouped : false,
		dataListStoreName : null,

		config : {
			// We populate a view.ExtSpectDataList only onPaint.
			// So initially it's empty and the height is not set properly.
			// doesnt help fullscreen : true,
			// flex : 1,
			minHeight : 600,
			height : '100%',
			// height : window.innerHeight, But cannot see bottom toolbar.
			minWidth : 300,
			width : '50%', // window.innerWidth / 2,
			rootObject : Ext.Viewport
		}
	}
);
