Ext.define( 'extspect.view.tree.datalist.ComponentsTree',
	{  extend : 'extspect.view.tree.datalist.TreeList',
		xtype : 'componentstree',

		computeObjectString : function ( object ) {
			if ( "items" in object )
			{ return this.callParent( arguments ); }
			else { return StringOf.to$( object ); }
		}
	}
);
