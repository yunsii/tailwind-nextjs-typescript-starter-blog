import janna from '@jannajs/lint/eslint'

export default janna({
  next: true,
  tailwind: true,
}, {
  rules: {
    'react/prop-types': 'off',
  },
})
