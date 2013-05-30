Ext.define( 'uxExtSpect.view.tree.datalist.ComponentsTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'componentstree',

		parentOf: function ( object ) {
			return object.parent;
		},

		isContainerOrClass: function ( object ) {
			return object.isContainer;
		},

		// Normally the root object is the Ext.Viewport
		collectRowObjects: function () {
			var rootObject = this.fetchRootObject(); // ext-viewport
			this.rowObjects = [];
			if ( rootObject ) {
				this.addRowObjects( rootObject );
			}
			return this.rowObjects;
		},

		createRowObject: function ( component ) {
			return { text: this.rowStringOf( component ), value: component };
		},

		isShowable: function ( component ) {
			var containable = component.isContainer &&
				( Ext.dataview.component.ListItem ? ! // No list items in Touch 2.0.1.1
					( component instanceof Ext.dataview.component.ListItem )
					: true );
			return containable || this.fetchParentNavigationView().showComponents;
		},

		objectChildren: function ( component ) {
			if ( ! component.isContainer ) { return []}
			// else
			var collection = component.items.filterBy( this.isShowable, this );
			return collection.items; // returns an array
		},

		addRowObjectsForObjectAndChildren: function ( component ) {
			this.addRowObject( component );
			if ( this.isContainerOrClass( component ) && ! this.isClosed( component ) ) {
				this.addChildRowObjects( component );
			}
		},

		setBranchState: function ( component, string ) {
			if ( this.objectChildren( component ).length > 0 ) {
				this.callParent( arguments );
			}
		}
	}
);
