Custom Styled Modal based on mui

Check how modal works here: https://mui.com/material-ui/react-modal/#main-content

Put main content of modal as children

You can use two variants of modal also

First one can be with only one button

If you use this variant you can use only two props singleButtonActionText ( text inside button ) 
singleButtonAction ( mouse event to add some actions when click on button  ) 
isSingleButton is blocked ( true by default )

If you want to use variant with two buttons you must add prop isSingleButton with value false
And you must specify 4 other props
leftButtonActionText - name inside left button
rightButtonActionText - name inside right button
leftButtonAction - accordingly mouse event for left button
rightButtonAction - mouse event for right button

You can use all other mui props https://mui.com/material-ui/react-modal/#main-content except of sx props
