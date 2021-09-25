# The Example

[First, the user clicks a button to redirect to the authorization service](https://drive.google.com/file/d/188TR6_8_w9XhPetJnI5uKwGeyJvzoe5Q/view?usp=sharing)

[Then, the user logs in to the 3rd party account](https://drive.google.com/file/d/19veaQ9lyBkrgQW-dcOPffxzFe083ZI7w/view?usp=sharing)

After authenticating, the user will be redirected back to your site. That redirection request will include a copy of your state string, and a code for the user. The state returned should match the state you set earlier, to ensure protection against CSRF attacks.

[Next, the code is exchanged for an access token](https://drive.google.com/file/d/13C9ImJi6Cq3X8qEzrQJBa6Q1lJO86PXo/view?usp=sharing)

[Finally, the access token is used to make authorized requests!](https://drive.google.com/file/d/10lTJTHgtuoN2dR-vgUxUFvHou_CuM8hg/view?usp=sharing)
