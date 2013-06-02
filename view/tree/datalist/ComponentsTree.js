Ext.define( 'uxExtSpect.view.tree.datalist.ComponentsTree',
	{  extend: 'uxExtSpect.view.tree.datalist.BranchStateTree',
		xtype: 'componentstree',

		parentOf: function ( object ) {
			return object.parent;
		},

		isContainerOrClass: function ( object ) {
			return object.isContainer;
		},

		isShowableContainer: function ( component ) {
			var isShowableContainer = component.isContainer &&
				( Ext.dataview.component.ListItem ? ! // No list items in Touch 2.0.1.1
					( component instanceof Ext.dataview.component.ListItem )
					: true );
			return isShowableContainer
		},

		isShowable: function ( component ) {
			return this.isShowableContainer( component ) || this.fetchParentNavigationView().showComponents;
		},

		// returns those items that are containers but not ListItem
		objectSubparts: function ( component ) {
			if ( ! this.isShowableContainer( component ) ) { return []; }
			var collection = component.items;
			return collection.items; // returns an array
		},

		showableChildren: function ( component ) {
			if ( ! component.isContainer ) { return []}
			// else
			var collection = component.items.filterBy( this.isShowable, this );
			return collection.items; // returns an array
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

		addRowObjectsForObjectAndChildren: function ( component ) {
			this.addRowObject( component );
			if ( this.isContainerOrClass( component ) && ! this.isClosed( component ) ) {
				this.addChildRowObjects( component );
			}
		},

		setBranchState: function ( component, string ) {
			if ( this.showableChildren( component ).length > 0 ) {
				this.callParent( arguments );
			}
		}
	}
)
;
