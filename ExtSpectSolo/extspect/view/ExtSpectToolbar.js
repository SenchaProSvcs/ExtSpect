Ext.define( 'extspect.view.ExtSpectToolbar',
	{  extend : 'Ext.Toolbar',
		isExtSpectToolbar : true,
		requires : 'Ext.SegmentedButton',
		defaultIdPrefix : 'es-',

		config : {
			docked : 'bottom',
			layout : { pack : 'center' }
		}
	}
);

