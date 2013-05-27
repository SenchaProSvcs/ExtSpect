
Ext.define( 'uxExtSpect.view.tree.datalist.ExtTree' ,
	{	extend : 'uxExtSpect.view.tree.datalist.PropertiesTree' ,
		xtype : 'exttree' ,

		requires :
		[	'uxExtSpect.object.rec.ExtRec' , 'uxExtSpect.object.rec.LeafRec'
		] ,

		// Do NOT put Ext as a value in a config. You get to stackoverflow from cloning
		fetchRootObject : function ( )
		{ return Ext; },

		determineRecClassName : function ( object )
		{	var recClassName;
			if ( object === Ext )
			{	recClassName = 'uxExtSpect.object.rec.ExtRec'; }
			else
			if ( object === Ext.Ajax )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object instanceof Ext.app.Application )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object instanceof Ext.env.Browser )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ClassManager )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ComponentQuery ) // cache is interesting for listeners
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object === Ext.ComponentManager )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object === Ext.data.ModelManager )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object === Ext.Router )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			if ( object === Ext.data.StoreManager )
			{	recClassName = 'uxExtSpect.object.rec.LeafRec'; }
			else
			{	recClassName = this.callParent( arguments ); }
			return recClassName;
		}
	}
);
