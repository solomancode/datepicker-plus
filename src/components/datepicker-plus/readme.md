# datepicker-plus



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description                               | Type          | Default          |
| ------------ | --------- | ----------------------------------------- | ------------- | ---------------- |
| `plusConfig` | --        | date picker plus config passed as a prop. | `IPlusConfig` | `DEFAULT_CONFIG` |


## Events

| Event              | Description                                                                                    | Type                    |
| ------------------ | ---------------------------------------------------------------------------------------------- | ----------------------- |
| `onDateSelect`     | emits when a date is selected. use it to react to date selected                                | `CustomEvent<string[]>` |
| `onDeselect`       | emits when a date is deselected use it to react to date deselected                             | `CustomEvent<string[]>` |
| `onHighlight`      | emits when a date or more is highlighted as potential select candidate                         | `CustomEvent<string[]>` |
| `onHighlightClear` | emits when date highlight is cleared after dates deselect                                      | `CustomEvent<void>`     |
| `onRangeSelect`    | emits when a complete date range is selected use it to react to a complete date range selected | `CustomEvent<string[]>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
