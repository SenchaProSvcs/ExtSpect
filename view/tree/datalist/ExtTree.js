
Ext.define( 'uxExtSpect.view.tree.datalist.ExtTree' ,
	{	extend : 'uxExtSpect.view.tree.datalist.PropertiesTree' ,
		xtype : 'exttree' ,

		requires : [	'uxExtSpect.object.rec.ExtRec' , 'uxExtSpect.object.rec.LeafRec' ] ,

		// Do NOT put Ext as a value in a config. You get to stackoverflow from cloning
		fetchRootObject : function ( ) { return Ext; },

		determineRecClassName : function ( object )
		{	var recClassName;
			if ( object === Ext )
			{	recClassName = 'uxExtSpect.object.rec.ExtRec'; }
			else
			if ( ( object === Ext.Ajax ) ||
				( object instanceof Ext.app.Application ) ||
				( object instanceof Ext.env.Browser ) ||
				( object === Ext.ClassManager ) ||
				( object === Ext.ComponentQuery ) || // cache is interesting for listeners
				( object === Ext.ComponentManager ) ||
				( object === Ext.Loader ) ||
				( object === Ext.data.ModelManager ) ||
				( object === Ext.Router ) ||
				( object === Ext.data.StoreManager )
				)
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			{	recClassName = this.callParent( arguments ); }
			return recClassName;
		}
	}
);
