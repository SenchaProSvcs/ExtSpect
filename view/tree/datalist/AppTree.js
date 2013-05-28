Ext.define( 'uxExtSpect.view.tree.datalist.AppTree',
	{  extend: 'uxExtSpect.view.tree.datalist.PropertiesTree',
		xtype: 'apptree',

		fetchRootObject: function () { return uxExtSpect.instance.getApp(); },

		computeAndSetData: function () {
			if ( this.fetchRootObject() ) { this.callParent( arguments ); }
			else { this.setHtml( 'NO APP SPECIFIED.<br/>See ReadMe.txt' ); }
		}
	}
);
