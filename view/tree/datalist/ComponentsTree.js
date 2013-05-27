Ext.define( 'uxExtSpect.view.tree.datalist.ComponentsTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'componentstree',

		computeObjectString: function ( object, objectString ) {
			if ( object.isContainer ) {
				return this.callParent( arguments );
			}
			else {
				return objectString;
			}
		},

		// see also buildFinalRowRecs2 and addNewRowObjects
		addComponentRowObjects2: function ( component ) {
			this.addComponentRowObject( component );
			if ( !this.fetchIsClosed( component ) ) {
				this.addComponentRowObjects3( component );
			}
		},

		assignIsClosed: function ( object, bool ) {
			console.group( arguments.callee.displayName, this.fetchIdString( object ), "bool=", bool );
			if ( object.isContainer ) {
				this.callParent( arguments );
			}
			console.groupEnd( arguments.callee.displayName );
		}
	}
);
