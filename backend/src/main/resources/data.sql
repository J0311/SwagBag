INSERT INTO product (id, quantity, price, description, image, name) VALUES (
    1,
    10,
    20.00,
    'A nice pair of headphones',
    'https://res-4.cloudinary.com/grover/image/upload/v1634740745/sojw9nnrug7qqz2mmact.png',
    'Headphones'
),
(
    2,
    5,
    45.00,
    'A nice TeeShirt',
    'https://d3o2e4jr3mxnm3.cloudfront.net/Mens-Jake-Guitar-Vintage-Crusher-Tee_68382_1_lg.png',
    'TeeShirt'
),
(
    3,
    20,
    2.50,
    'A reusable shopping bag',
    'https://images.ctfassets.net/5gvckmvm9289/3BlDoZxSSjqAvv1jBJP7TH/65f9a95484117730ace42abf64e89572/Noissue-x-Creatsy-Tote-Bag-Mockup-Bundle-_4_-2.png',
    'Shopping Bag'
),
(
    4,
    20,
    10.00,
    'A fancy cap for a fancy person',
    'https://d3o2e4jr3mxnm3.cloudfront.net/Rocket-Vintage-Chill-Cap_66374_1_lg.png',
    'Baseball Cap'
),
(
    5,
    3,
    80.00,
    'A nice coat',
    'https://www.pngarts.com/files/3/Women-Jacket-PNG-High-Quality-Image.png',
    'Coat'
);

INSERT INTO users (id, email, password, first_name, last_name, role) VALUES (
    1,
    'testuser@gmail.com',
    'password',
    'Test',
    'Customer',
    'CUSTOMER'
), 
(
    2,
    'admin@swagbag.com',
    'password',
    'Test',
    'Admin',
    'ADMIN'
);