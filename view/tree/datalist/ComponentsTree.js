Ext.define( 'uxExtSpect.view.tree.datalist.ComponentsTree',
	{  extend: 'uxExtSpect.view.tree.datalist.TreeList',
		xtype: 'componentstree',

		valueString2: function ( object, objectString ) {
			if ( object.isContainer ) {
				return this.callParent( arguments );
			}
			else {
				return objectString;
			}
		},

		collectRowObjects: function () {
			this.rowObjects = this.collectComponentRowObjects();
			return this.rowObjects;
		},

		createComponentRowObject: function ( component ) {
			return { text: this.computeRowObjectString( component ), value: component };
		},

		addComponentRowObject: function ( component ) {
			var newRowObject = this.createComponentRowObject( component );
			this.componentRowObjects.push( newRowObject );
		},

		// TODO : Ext.ComponentManger.map has all the components
		// Normally the root object is the Ext.Viewport
		collectComponentRowObjects: function () {
			var rootObject = this.fetchRootObject();
			this.componentRowObjects = [];
			if ( rootObject ) {
				this.depth = 1;
				this.totalCounts = [];
				this.counts = [];
				this.addComponentAndSubcomponentRowObjects( rootObject );
			}
			return this.componentRowObjects;
		},

		// see also buildFinalRowRecs2 and addNewRowObjects
		addComponentAndSubcomponentRowObjects: function ( component ) {
			var containable = component.isContainer && ! ( component instanceof Ext.dataview.component.ListItem );
			var showable = containable || this.fetchParentNavigationView().showComponents;
			if ( showable ) {
				this.addComponentRowObject( component );
			}

			if ( component.isContainer
				&& ! this.fetchIsClosed( component ) ) {
				this.addSubcomponentRowObjects( component );
			}
		},

		// see also buildFinalRowRecs2 and addNewRowObjects
		addSubcomponentRowObjects: function ( component ) {
			var collection = component.items;
			var totalCount = collection.getCount();
			if ( totalCount > 0 ) {
				this.depth ++;
				this.totalCounts.push( totalCount );
				this.counts.push( 0 );
				collection.each( this.addComponentAndSubcomponentRowObjects, this );
				this.counts.pop();
				this.totalCounts.pop();
				this.depth --;
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
