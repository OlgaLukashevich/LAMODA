export default function generateProducts(COUNT_PRODUCT) {
  const NAME = [
    'Куртка',
    'Парка',
    'Шорты',
    'Очки',
    'Брюки',
    'Сумка',
    'Кеды',
    'Кепка',
    'Рубашка',
    'Блузка',
    'Туфли',
  ]
  const COLOR = [
    'Лимонный',
    'песочный',
    'Алый',
    'индиго',
    'Медовый',
    'зеленый',
    'Охра',
    'Дынно-желтый',
    'еловый',
    'Арлекин',
    'церулеум',
  ]
  const IMG = [
    { src: 'https://delvin.by/wp-content/uploads/2019/06/empty.png' },
    { src: 'https://klike.net/uploads/posts/2020-04/1587719791_1.jpg' },
    { src: 'https://dfm.ru/uploads/e0/36/bc79c9989f55ad2d9fdeb97c5cd6.jpg' },
    {
      src:
        'https://all-t-shirts.ru/goods_images/ru110593II000b0c5a557c39d3bcb18fc5a317465e3cf.jpg',
    },
    {
      src:
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd1iV6HpA-_hdpMAmRul7B3xalt1wx1ytebysQJ7I6mfwJOAMP6V30iC_JRdTjwm4cSXE&usqp=CAU',
    },
  ]

  const randomForValue = (value) =>
    value[Math.floor(Math.random() * (value.length - 1))]

  const generateProduct = () => ({
    image: randomForValue(IMG),
    id: Date.now + Math.random().toString(36).substring(4),
    name: randomForValue(NAME),
    color: randomForValue(COLOR),
    rating: Math.round(Math.random() * (100 - 1) + 1),
    price: Math.round(Math.random() * (9999 - 10) + 10),
    desc: getRandomDescription(),
  })
  const products = []

  for (let i = 0; i < COUNT_PRODUCT; i++) {
    products.push(generateProduct())
  }

  return products
}
const getRandomDescription = () => {
  function getRandomWord(firstLetterToUppercase = false) {
    const word = Math.random().toString(36).substring(2)
    return firstLetterToUppercase
      ? word.charAt(0).toUpperCase() + word.slice(1)
      : word
  }

  function generateDESC(length = 5) {
    return [...Array(length)].map((_, i) => getRandomWord(i === 0)).join('  ')
  }
  return generateDESC(5)
}
