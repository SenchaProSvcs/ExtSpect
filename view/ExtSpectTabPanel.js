Ext.define( 'ux.extspect.view.ExtSpectTabPanel',
	{  extend : 'Ext.tab.Panel',
		defaultIdPrefix : 'es-',
		isExtSpectTabPanel : true,

		config : {
			title : 'ExtSpect 0.3.0',
			rootObject : Ext.Viewport,
			layout : 'card',
			defaults : { layout : 'fit' } // 'fit' is important
		},

		fetchRootObject : function () {
			var rootObject = this.getRootObject();
			if ( !rootObject ) {
				rootObject = this.fetchParentNavigationView().getRootObject();
				console.warn( 'rootObject from NavView', rootObject );
			}
			return rootObject;
		},

		fetchParentNavigationView : function () { return this.up( '[isExtSpectNavigationView]' ); }
	}
);
