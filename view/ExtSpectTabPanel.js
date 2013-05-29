Ext.define( 'uxExtSpect.view.ExtSpectTabPanel',
	{  extend : 'Ext.tab.Panel',
		defaultIdPrefix : 'es-',
		isExtSpectTabPanel : true,

		config : {
			title : 'ExtSpect 0.4.' + Ext.version.version,
			rootObject : Ext.Viewport,
			layout : 'card',
			defaults : { layout : 'fit' } // 'fit' is important
		},

		fetchRootObject : function () {
			var rootObject = this.getRootObject();
			if ( !rootObject ) {
				rootObject = this.fetchParentNavigationView().getRootObject();
				console.warn( arguments.callee.displayName,  'rootObject from NavView', rootObject );
			}
			return rootObject;
		},

		fetchParentNavigationView : function () { return this.up( '[isExtSpectNavigationView]' ); }
	}
);
