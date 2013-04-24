Ext.define( 'ux.extspect.object.rec.ApplicationRec',
	{  extend : 'ux.extspect.object.rec.ControllerRec',

		properties : [
			"_controllerInstances" ,
			"_stores" , "_models" , "_views" , // these are props of Controller
			"_currentProfile" , "_profiles" , "_profileInstances"
		],

		listenerProperties : [
			"bubbleEvents" , "_router" , "_listeners" , "managedListeners" , "_history"
		]
	}
);
