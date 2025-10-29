# TODO: Enhance DiscountModal Logic

- [x] Add imports for useState and useEffect from React
- [x] Introduce internal state: hasClaimed (boolean) and isModalOpen (boolean)
- [x] Add useEffect on mount to check localStorage for "discount_claimed" and set hasClaimed
- [x] Add useEffect for scroll detection: listen for scroll >30% and set isModalOpen to true, then remove listener
- [x] Update render condition to check isModalOpen and hasClaimed instead of isOpen
- [x] Modify claim button onClick to set localStorage, update states, and call onClose
- [x] Update close button onClick to set isModalOpen to false and call onClose
