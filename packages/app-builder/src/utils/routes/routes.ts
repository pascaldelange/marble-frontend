export const routes = [
  {
    "id": "root",
    "path": "",
    "file": "root.tsx",
    "children": [
      {
        "id": "routes/ressources/scenarios/$scenarioId/$iterationId/validate-with-given-trigger-or-rule",
        "path": "ressources/scenarios/:scenarioId/:iterationId/validate-with-given-trigger-or-rule",
        "file": "routes/ressources/scenarios/$scenarioId/$iterationId/validate-with-given-trigger-or-rule.tsx"
      },
      {
        "id": "routes/ressources/scenarios/$scenarioId/$iterationId/rules/duplicate",
        "path": "ressources/scenarios/:scenarioId/:iterationId/rules/duplicate",
        "file": "routes/ressources/scenarios/$scenarioId/$iterationId/rules/duplicate.tsx"
      },
      {
        "id": "routes/ressources/scenarios/$scenarioId/$iterationId/create_draft",
        "path": "ressources/scenarios/:scenarioId/:iterationId/create_draft",
        "file": "routes/ressources/scenarios/$scenarioId/$iterationId/create_draft.tsx"
      },
      {
        "id": "routes/ressources/scenarios/$scenarioId/$iterationId/rules/create",
        "path": "ressources/scenarios/:scenarioId/:iterationId/rules/create",
        "file": "routes/ressources/scenarios/$scenarioId/$iterationId/rules/create.tsx"
      },
      {
        "id": "routes/ressources/scenarios/$scenarioId/$iterationId/rules/delete",
        "path": "ressources/scenarios/:scenarioId/:iterationId/rules/delete",
        "file": "routes/ressources/scenarios/$scenarioId/$iterationId/rules/delete.tsx"
      },
      {
        "id": "routes/ressources/settings/inboxes/inbox-users/create",
        "path": "ressources/settings/inboxes/inbox-users/create",
        "file": "routes/ressources/settings/inboxes/inbox-users/create.tsx"
      },
      {
        "id": "routes/ressources/settings/inboxes/inbox-users/delete",
        "path": "ressources/settings/inboxes/inbox-users/delete",
        "file": "routes/ressources/settings/inboxes/inbox-users/delete.tsx"
      },
      {
        "id": "routes/ressources/settings/inboxes/inbox-users/update",
        "path": "ressources/settings/inboxes/inbox-users/update",
        "file": "routes/ressources/settings/inboxes/inbox-users/update.tsx"
      },
      {
        "id": "routes/ressources/settings/inboxes/create",
        "path": "ressources/settings/inboxes/create",
        "file": "routes/ressources/settings/inboxes/create.tsx"
      },
      {
        "id": "routes/ressources/settings/inboxes/delete",
        "path": "ressources/settings/inboxes/delete",
        "file": "routes/ressources/settings/inboxes/delete.tsx"
      },
      {
        "id": "routes/ressources/settings/inboxes/update",
        "path": "ressources/settings/inboxes/update",
        "file": "routes/ressources/settings/inboxes/update.tsx"
      },
      {
        "id": "routes/ressources/auth/login-with-email",
        "path": "ressources/auth/login-with-email",
        "file": "routes/ressources/auth/login-with-email.tsx"
      },
      {
        "id": "routes/ressources/settings/users/create",
        "path": "ressources/settings/users/create",
        "file": "routes/ressources/settings/users/create.tsx"
      },
      {
        "id": "routes/ressources/settings/users/delete",
        "path": "ressources/settings/users/delete",
        "file": "routes/ressources/settings/users/delete.tsx"
      },
      {
        "id": "routes/ressources/settings/users/update",
        "path": "ressources/settings/users/update",
        "file": "routes/ressources/settings/users/update.tsx"
      },
      {
        "id": "routes/ressources/scenarios/deployment",
        "path": "ressources/scenarios/deployment",
        "file": "routes/ressources/scenarios/deployment.tsx"
      },
      {
        "id": "routes/ressources/settings/tags/create",
        "path": "ressources/settings/tags/create",
        "file": "routes/ressources/settings/tags/create.tsx"
      },
      {
        "id": "routes/ressources/settings/tags/delete",
        "path": "ressources/settings/tags/delete",
        "file": "routes/ressources/settings/tags/delete.tsx"
      },
      {
        "id": "routes/ressources/settings/tags/update",
        "path": "ressources/settings/tags/update",
        "file": "routes/ressources/settings/tags/update.tsx"
      },
      {
        "id": "routes/ressources/lists/value_create",
        "path": "ressources/lists/value_create",
        "file": "routes/ressources/lists/value_create.tsx"
      },
      {
        "id": "routes/ressources/lists/value_delete",
        "path": "ressources/lists/value_delete",
        "file": "routes/ressources/lists/value_delete.tsx"
      },
      {
        "id": "routes/ressources/cases/add-comment",
        "path": "ressources/cases/add-comment",
        "file": "routes/ressources/cases/add-comment.tsx"
      },
      {
        "id": "routes/ressources/cases/add-to-case",
        "path": "ressources/cases/add-to-case",
        "file": "routes/ressources/cases/add-to-case.tsx"
      },
      {
        "id": "routes/ressources/cases/create-case",
        "path": "ressources/cases/create-case",
        "file": "routes/ressources/cases/create-case.tsx"
      },
      {
        "id": "routes/ressources/cases/edit-status",
        "path": "ressources/cases/edit-status",
        "file": "routes/ressources/cases/edit-status.tsx"
      },
      {
        "id": "routes/ressources/cases/edit-inbox",
        "path": "ressources/cases/edit-inbox",
        "file": "routes/ressources/cases/edit-inbox.tsx"
      },
      {
        "id": "routes/ressources/data/createField",
        "path": "ressources/data/createField",
        "file": "routes/ressources/data/createField.tsx"
      },
      {
        "id": "routes/ressources/data/createTable",
        "path": "ressources/data/createTable",
        "file": "routes/ressources/data/createTable.tsx"
      },
      {
        "id": "routes/ressources/scenarios/create",
        "path": "ressources/scenarios/create",
        "file": "routes/ressources/scenarios/create.tsx"
      },
      {
        "id": "routes/ressources/cases/edit-name",
        "path": "ressources/cases/edit-name",
        "file": "routes/ressources/cases/edit-name.tsx"
      },
      {
        "id": "routes/ressources/cases/edit-tags",
        "path": "ressources/cases/edit-tags",
        "file": "routes/ressources/cases/edit-tags.tsx"
      },
      {
        "id": "routes/ressources/data/createLink",
        "path": "ressources/data/createLink",
        "file": "routes/ressources/data/createLink.tsx"
      },
      {
        "id": "routes/ressources/data/editField",
        "path": "ressources/data/editField",
        "file": "routes/ressources/data/editField.tsx"
      },
      {
        "id": "routes/ressources/data/editTable",
        "path": "ressources/data/editTable",
        "file": "routes/ressources/data/editTable.tsx"
      },
      {
        "id": "routes/ressources/user/language",
        "path": "ressources/user/language",
        "file": "routes/ressources/user/language.tsx"
      },
      {
        "id": "routes/ressources/auth/refresh",
        "path": "ressources/auth/refresh",
        "file": "routes/ressources/auth/refresh.tsx"
      },
      {
        "id": "routes/ressources/lists/create",
        "path": "ressources/lists/create",
        "file": "routes/ressources/lists/create.tsx"
      },
      {
        "id": "routes/ressources/lists/delete",
        "path": "ressources/lists/delete",
        "file": "routes/ressources/lists/delete.tsx"
      },
      {
        "id": "routes/ressources/auth/logout",
        "path": "ressources/auth/logout",
        "file": "routes/ressources/auth/logout.tsx"
      },
      {
        "id": "routes/ressources/auth/login",
        "path": "ressources/auth/login",
        "file": "routes/ressources/auth/login.tsx"
      },
      {
        "id": "routes/ressources/lists/edit",
        "path": "ressources/lists/edit",
        "file": "routes/ressources/lists/edit.tsx"
      },
      {
        "id": "routes/login-with-email",
        "path": "login-with-email",
        "file": "routes/login-with-email.tsx"
      },
      {
        "id": "routes/healthcheck",
        "path": "healthcheck",
        "file": "routes/healthcheck.ts"
      },
      {
        "id": "routes/__builder",
        "file": "routes/__builder.tsx",
        "children": [
          {
            "id": "routes/__builder/decisions/$decisionId",
            "path": "decisions/:decisionId",
            "file": "routes/__builder/decisions/$decisionId.tsx"
          },
          {
            "id": "routes/__builder/scenarios/$scenarioId",
            "path": "scenarios/:scenarioId",
            "file": "routes/__builder/scenarios/$scenarioId.tsx",
            "children": [
              {
                "id": "routes/__builder/scenarios/$scenarioId/i/$iterationId",
                "path": "i/:iterationId",
                "file": "routes/__builder/scenarios/$scenarioId/i/$iterationId.tsx",
                "children": [
                  {
                    "id": "routes/__builder/scenarios/$scenarioId/i/$iterationId/rules.$ruleId",
                    "path": "rules/:ruleId",
                    "file": "routes/__builder/scenarios/$scenarioId/i/$iterationId/rules.$ruleId.tsx"
                  },
                  {
                    "id": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view",
                    "file": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view.tsx",
                    "children": [
                      {
                        "id": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/decision",
                        "path": "decision",
                        "file": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/decision.tsx"
                      },
                      {
                        "id": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/trigger",
                        "path": "trigger",
                        "file": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/trigger.tsx"
                      },
                      {
                        "id": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/index",
                        "index": true,
                        "file": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/index.tsx"
                      },
                      {
                        "id": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/rules",
                        "path": "rules",
                        "file": "routes/__builder/scenarios/$scenarioId/i/$iterationId/__edit-view/rules.tsx"
                      }
                    ]
                  }
                ]
              },
              {
                "id": "routes/__builder/scenarios/$scenarioId/index",
                "index": true,
                "file": "routes/__builder/scenarios/$scenarioId/index.tsx"
              }
            ]
          },
          {
            "id": "routes/__builder/scheduled-executions",
            "path": "scheduled-executions",
            "file": "routes/__builder/scheduled-executions.tsx"
          },
          {
            "id": "routes/__builder/settings/__settings",
            "path": "settings",
            "file": "routes/__builder/settings/__settings.tsx",
            "children": [
              {
                "id": "routes/__builder/settings/__settings/inboxes/$inboxId",
                "path": "inboxes/:inboxId",
                "file": "routes/__builder/settings/__settings/inboxes/$inboxId.tsx"
              },
              {
                "id": "routes/__builder/settings/__settings/inboxes/index",
                "index": true,
                "path": "inboxes",
                "file": "routes/__builder/settings/__settings/inboxes/index.tsx"
              },
              {
                "id": "routes/__builder/settings/__settings/api-keys",
                "path": "api-keys",
                "file": "routes/__builder/settings/__settings/api-keys.tsx"
              },
              {
                "id": "routes/__builder/settings/__settings/users",
                "path": "users",
                "file": "routes/__builder/settings/__settings/users.tsx"
              },
              {
                "id": "routes/__builder/settings/__settings/tags",
                "path": "tags",
                "file": "routes/__builder/settings/__settings/tags.tsx"
              }
            ]
          },
          {
            "id": "routes/__builder/upload/$objectType",
            "path": "upload/:objectType",
            "file": "routes/__builder/upload/$objectType.tsx"
          },
          {
            "id": "routes/__builder/decisions/index",
            "index": true,
            "path": "decisions",
            "file": "routes/__builder/decisions/index.tsx"
          },
          {
            "id": "routes/__builder/scenarios/index",
            "index": true,
            "path": "scenarios",
            "file": "routes/__builder/scenarios/index.tsx"
          },
          {
            "id": "routes/__builder/settings/index",
            "index": true,
            "path": "settings",
            "file": "routes/__builder/settings/index.tsx"
          },
          {
            "id": "routes/__builder/cases/$caseId",
            "path": "cases/:caseId",
            "file": "routes/__builder/cases/$caseId.tsx"
          },
          {
            "id": "routes/__builder/cases/inboxes",
            "path": "cases/inboxes",
            "file": "routes/__builder/cases/inboxes.tsx",
            "children": [
              {
                "id": "routes/__builder/cases/inboxes/$inboxId",
                "path": ":inboxId",
                "file": "routes/__builder/cases/inboxes/$inboxId.tsx"
              }
            ]
          },
          {
            "id": "routes/__builder/lists/$listId",
            "path": "lists/:listId",
            "file": "routes/__builder/lists/$listId.tsx"
          },
          {
            "id": "routes/__builder/cases/index",
            "index": true,
            "path": "cases",
            "file": "routes/__builder/cases/index.tsx"
          },
          {
            "id": "routes/__builder/lists/index",
            "index": true,
            "path": "lists",
            "file": "routes/__builder/lists/index.tsx"
          },
          {
            "id": "routes/__builder/data",
            "path": "data",
            "file": "routes/__builder/data.tsx"
          },
          {
            "id": "routes/__builder/api",
            "path": "api",
            "file": "routes/__builder/api.tsx"
          },
          {
            "id": "routes/__builder/$",
            "path": "*",
            "file": "routes/__builder/$.tsx"
          }
        ]
      },
      {
        "id": "routes/index",
        "index": true,
        "file": "routes/index.tsx"
      },
      {
        "id": "routes/login",
        "path": "login",
        "file": "routes/login.tsx"
      }
    ]
  }
] as const;
