require(["wc/fixes",
	"wc/config",
	"wc/i18n/i18n", // ALWAYS REQUIRED IN THIS LAYER
	"wc/a8n", // ALWAYS REQUIRED IN THIS LAYER
	"wc/ui/backToTop",
	"wc/ui/cancelButton",
	"wc/ui/checkBox",
	"wc/ui/collapsible",
	"wc/ui/collapsibleToggle",
	"wc/ui/confirm",
	"wc/ui/containerload",
	"wc/ui/calendar",
	"wc/ui/defaultSubmit",
	"wc/ui/dialog",
	"wc/ui/draggable",
	"wc/ui/dropdown",
	"wc/ui/field",
	"wc/ui/fileUpload",
	"wc/ui/label",
	"wc/ui/menu",
	"wc/ui/multiFileUploader",
	"wc/ui/multiFormComponent",
	"wc/ui/multiSelectPair",
	"wc/ui/numberField",
	"wc/ui/onloadFocusControl",
	"wc/ui/radioButtonSelect",
	"wc/ui/selectboxSearch",
	"wc/ui/shuffler",
	"wc/ui/subordinate",
	"wc/ui/table",
	"wc/ui/tabset",
	"wc/ui/textArea",
	"wc/ui/timeoutWarn",
	"wc/ui/tooltip"],
	function (f, wcconfig) {
		"use strict";
		require(f);
		var media = "only screen and (max-width: 773px)",
			dto = {
				inherit: true,
				css: {
					phone: {
						media: media
					},
					uc: {
						test: "uc",
						media: media
					}
				}
			};
		wcconfig.set(dto, "wc/loader/style");
	});
