Ext.define( 'uxExtSpect.view.tree.datalist.ComponentsTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'componentstree',

		computeObjectString: function ( object, objectString ) {
			if ( "items" in object ) {
				return this.callParent( arguments );
			}
			else {
				return objectString; //  uxExtSpect.util.StringOf.to$( object );
			}
		}
	}
);
