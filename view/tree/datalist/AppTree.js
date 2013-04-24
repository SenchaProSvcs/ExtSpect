Ext.define( 'ux.extspect.view.tree.datalist.AppTree',
	{  extend : 'ux.extspect.view.tree.datalist.PropertiesTree',
		xtype : 'apptree',

		fetchRootObject : function () { return ux.extspect.instance.getApp(); },

		computeAndSetData : function () {
			if ( this.fetchRootObject() )
			{ this.callParent( arguments ); }
			else { this.setHtml( 'NO APP SPECIFIED.<br/>See ReadMe.txt' ); }
		}
	}
);
