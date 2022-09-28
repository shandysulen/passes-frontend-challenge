# Passes Frontend Challenge

I was successfully able to implement all business logic requested, including API integration using `axios`. I partially completed Bonus #1 and fully completed Bonus #2.

## Notes

Although the instructions said to not use any dependencies besides `axios`, I used a [Next.js Chakra UI starter kit](https://github.com/vercel/next.js/tree/canary/examples/with-chakra-ui) to bootstrap the app so I could immediately begin working on the custom business logic of the like button. Additionally, for the delightful animation, I used `canvas-confetti` which approximately matches the animation of the Twitter like button. If any of this is deemed unacceptable, I am happy to repeat the challenge using purely vanilla React, but I hoped it would be appreciated to show my familiarity with "gold standard" React technologies that are likely to be used in production for Passes.

## Things I Would Improve

- The `useDebounce()` hook doesn't work as expected yet but I would follow through with approach