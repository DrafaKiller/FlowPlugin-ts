# ChangeLog

## 1.4.0

Added:
- Exported `FlowQuery` type
- Functions for responding to actions (e.g. `response.changeQuery(...)`, `response.copyToClipboard(...)`, etc...)

Changed:
- Renamed `RequestQuery` to `FlowQuery`, so it's more consistent with the rest of the API by using the `Flow` prefix

## 1.3.0

Changed:
- Made `Flow.Actions.changeQuery` property `dontHideAfterAction` set to `true` by default

## 1.2.0

Added:
- `Flow.Actions.*` methods to make it easier to create actions

## 1.1.0

Changed:
- Custom action response is now done with `response.reply` instead of `response.send`

## 1.0.2

Changed:
- Improved documentation, to be more complete and consistent

## 1.0.1

Changed:
- Improved documentation
- Improved examples

Removed:
- Development dependency `nodemon`, because it had vulnerability issues

## 1.0.0

> ### **Breaking changes:**
> 
> - Improved overall API structure and type definitions, it's more consistent and type-safe now.
> - Seperated implementation into seperate components
> 
> Check the [API documentation](https://github.com/DrafaKiller/FlowPlugin-ts/blob/v1.0.0/README.md) for more information.

## 0.0.3

Fixed:
- Npm vulnerability issues

## 0.0.2

**Initial release:** FlowPlugin

## 0.0.1

*The package name was previously being used by another developer.*
