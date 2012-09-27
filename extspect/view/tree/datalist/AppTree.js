Ext.define( 'extspect.view.tree.datalist.AppTree',
	{  extend : 'extspect.view.tree.datalist.PropertiesTree',
		xtype : 'apptree',

		fetchRootObject : function () { return ExtSpect.app; },

		computeAndSetData : function () {
			if ( this.fetchRootObject() )
			{ this.callParent( arguments ); }
			else { this.setHtml( 'NO APP SPECIFIED.<br/>See ReadMe.txt' ); }
		}
	}
);
