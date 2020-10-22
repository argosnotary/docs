/*
 * Copyright (C) 2019 - 2020 Rabobank Nederland
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
module.exports = {
  docs: 
  {
    Overview: ['00_overview/10_overview'],
    'Getting started': [ 
        '10_get_started/10_get_started', 
        '10_get_started/20_examples'],
    'User Manual': ['15_user_manual/10_user_profile', 
        '15_user_manual/15_permissions', 
        '15_user_manual/20_service_account', 
        '15_user_manual/25_layout', 
        '15_user_manual/30_approval',
        '15_user_manual/35_release'],
    Architecture: [
    	'20_architecture/10_architecture', 
    	{ 
    		type: 'category',
    		label: 'Architectural Decisions',
    		items: [ '20_architecture/20_decisions/10_intro']
    	},
    ],
    Installation: ['30_installation/10_installation', '30_installation/20_upgrade'],
    'System administration': ['40_administration/10_maintenance', '40_administration/20_recover'],
    Security: ['50_security/10_authentication', '50_security/20_authorization'],
    'Supply Chain management': ['60_supplychain_management/10_wip'],
    Approvals: ["63_approvals/10_approval_collector",
    			"63_approvals/20_xldeploy_approval_collector",
    			"63_approvals/30_git_approval_collector"
    			],
    Extensions: [ "65_extensions/10_jenkins_plugin",
    			"65_extensions/20_xldeploy_plugin",
    			"65_extensions/30_docker_plugin"
    	],
    Reference: [
    	'70_reference/10_terminology',
    	'70_reference/20_layout',
    	'70_reference/21_link',
    	'70_reference/22_signing',
    	'70_reference/23_release',
    	'70_reference/24_verification',
    	{ 
    		type: 'category',
    		label: 'Helm Charts',
    		items: [
    			{type: "link", label:"Argos Notary", href: "https://github.com/argosnotary/charts/blob/master/argosnotary/README.md"},
        	    {type: "link", label:"XLDeploy Collector", href: "https://github.com/argosnotary/charts/blob/master/xldeploy-argos-collector/README.md"},
        	    {type: "link", label:"Git Collector", href: "https://github.com/argosnotary/charts/blob/master/git-argos-collector/README.md"},
        	]
    	},
    	{ 
    		type: 'category',
    		label: 'Javadocs',
    		items: [
    			{type: "link", label:"argos-service", href: "https://argosnotary.github.io/generated/javadoc/argos-service"},
        	    {type: "link", label:"argos4j", href: "https://argosnotary.github.io/generated/javadoc/argos4j"},
        	]
    	},
    	{type: "link", label:"REST api", href: "https://argosnotary.github.io/generated/openapi"},
    ],
    Contributing: ['80_contributing/10_contributing','80_contributing/20_code_of_conduct'],
  },
};
