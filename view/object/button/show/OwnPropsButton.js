Ext.define( 'ux.extspect.view.object.button.show.OwnPropsButton',
	{  extend : 'ux.extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'ownpropertiesbutton',
		config : {    text : 'Own Properties',
			handler : function () { this.showOwnProperties(); }
		}
	}
);
