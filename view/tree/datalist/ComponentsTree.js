Ext.define( 'ux.extspect.view.tree.datalist.ComponentsTree',
	{  extend : 'ux.extspect.view.tree.datalist.TreeList',
		xtype : 'componentstree',

		computeObjectString : function ( object ) {
			if ( "items" in object )
			{ return this.callParent( arguments ); }
			else { return ux.extspect.util.StringOf.to$( object ); }
		}
	}
);
