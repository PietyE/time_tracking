To change size of avatar use required props size.
It can be 'extraSmall' | 'small' | 'medium' | 'large';

If you want to use username as avatar picture put it into prop name, you will get a random avatar color and first name initials of username ( max initials are 3 )
If you want to use image url as avatar put it to src prop

You cant use src and name both
Pick only 1 prop , if src will be not working for some reason ( wrong URL for example ) you will get avatar with 404 picture
if name will be empty you will get picture with letter A ( Anonymous )

You can use all other mui props https://mui.com/material-ui/react-avatar/#main-content except of sx props and alt
