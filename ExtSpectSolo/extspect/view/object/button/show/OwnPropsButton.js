Ext.define( 'extspect.view.object.button.show.OwnPropsButton',
	{  extend : 'extspect.view.object.button.PropertiesListToolbarButton',
		xtype : 'ownpropertiesbutton',
		config : {    text : 'Own Properties',
			handler : function () { this.showOwnProperties(); }
		}
	}
);
