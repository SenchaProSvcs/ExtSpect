Ext.define( 'uxExtSpect.view.tree.datalist.ComponentsTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'componentstree',

		spanString: function ( object, objectString ) {
			if ( object.isContainer ) {
				return this.callParent( arguments );
			}
			else {
				return objectString;
			}
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
			return { text: this.computeRowObjectString( component ), value: component };
		},

		isShowable: function ( component ) {
			var containable = component.isContainer &&
				( Ext.dataview.component.ListItem ? ! // No list items in Touch 2.0.1.1
					( component instanceof Ext.dataview.component.ListItem ) : true );
			return containable || this.fetchParentNavigationView().showComponents;
		},

		addRowObjectsForObjectAndChildren: function ( component ) {
			this.addRowObject( component );
			if ( component.isContainer && ! this.fetchIsClosed( component ) ) {
				this.addChildRowObjects( component );
			}
		},

		objectChildren: function ( component ) {
			return component.items.filterBy( this.isShowable, this ).items; // returns an array
		},

//		addChildRowObjects: function ( component ) {
//			var collection = this.objectChildren( component );
//			var totalCount = collection.getCount();
//			if ( totalCount > 0 ) {
//				this.depth ++ // used when showListing
//				this.totalCounts.push( totalCount ); // totalCount
//				this.counts.push( 0 );
//				collection.each( this.addRowObjectsForObjectAndChildren, this );
//				this.counts.pop();
//				this.totalCounts.pop();
//				this.depth --;
//			}
//		},

		assignIsClosed: function ( component, bool ) {
			if ( this.objectChildren( component ).length > 0 ) {
				this.callParent( arguments );
			}
		}
	}
)
;
