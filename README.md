<p align="Center">
  <img src="https://bixbydevelopers.com/dev/docs-assets/resources/dev-guide/bixby_logo_github-11221940070278028369.png">
  <br/>
  <h1 align="Center">Bixby Shirt Sample Capsule</h1>
</p>

## Overview

This capsule is the the companion code to the Bixby [Basic Cart Transactional Capsule](https://bixbydevelopers.com/dev/docs/sample-capsules/walkthroughs/basic-transactional) guide. This capsule is a shirt store. Users can search for shirts which they can then add to and update in a cart. This capsule demonstrates use of more complex [transactional workflows](https://bixbydevelopers.com/dev/docs/dev-guide/developers/modeling.modeling-actions.transactional-workflows)

## Example flow

```
Buy a medium V-Neck
Change the size
(Select small)
Add an Oxford Dress Shirt
Remove Polo Shirt from my order
(Note above won't match any existing shirt so you get a prompt. Select V-Neck)
Add 2 Medium Polo Shirts to my order
Change the quantity
Note there are two items in the shopping cart so one must be selected. Select Polo Shirt
(Enter 5)
Change the quantity of the Polo Shirt
(Enter 3)
Click Yes
```

## Creating an order

Example 1: No reference to a shirt. System will prompt for the user to pick a shirt from the list of all available shirts. User will also be prompted for size and quantity.

```
Find shirts I can buy
```

Example 2: Same as example 1 but no prompts for size or quantity.

```
Buy 2 medium shirts
```


Example 3: User refers to the name of the item that should be added to the cart.

```
Buy a Large Sweatshirt
```

Example 4: User makes an order with multiple items. Note that currently adding up to 3 items in a single utterance is 
supported.

```
Order 2 Polo Shirts and 1 V-Neck Shirt
```

## Updating the order

### Adding an item to the cart

Example 1. Continue on an order and add one more item. 

```
Add 2 Medium Polo Shirts to my order
```

Example 2. Continue on an order and add two more items

```
Add 1 small polo and 2 small collar dress shirts to my cart 
``` 

### Deleting an item from the cart

Example 1: Remove an item from the order. 
```
Remove Polo Shirt from my order
```

Example 2: Remove multiple items. Note that currently removing up to 3 items in a single utterance is supported.
```
Remove the polo shirt and the collar dress shirt
```

### Changing shirt size

Example 1: This works without any prompts if there is only a single item in the cart.
If multiple items in the cart and none is referenced then user will be prompted to choose an item from the cart.
If there is no items in the cart then capsule will just state that there's no items.

```
Change the size to Large
```

Example 2: This works without any prompts if there is only a single Polo Shirt in the cart. You will be prompted to 
choose one of polo shirts if multiple Polo Shirts are in the cart (e.g. small one and a large one)

```
Change the size of the Polo Shirt to small
```

### Changing shirt quantity

Example: 

```
Change that to 3 Polo Shirts
```

### Changing multiple items in the cart

Example: Changing sizes of two different items in the cart. Note that currently changing up to 3 items is supported in
a single utterance.
 
```
Change the V-Neck to Small and the polo shirt to Large
```

### Changing and adding to the cart

Example: Continue on an order and change an item and add another item in one utterance.
         
```
Make that a Large V-Neck and add an Oxford Dress Shirt
```

### Changing and removing from the cart

Example: Continue on an order and change an item and remove another item in one utterance.
         
```
Change the polo shirt to Large and remove the v-neck and the collar dress shirt
```


### Changing shirt size without providing a value

Example 1: Ask to change quantity without specifying the new size. You will be prompted to choose a shirt if 
multiple items in the cart and then you will be prompted to provide the size.
```
Change the size
```

Example 2: You will be prompted to choose a shirt if multiple "Polo Shirts" in the cart (e.g. small one and a large one)
or you will be prompted to choose an item if no items matches "Polo Shirts". Then you will be prompted to provide the 
size.
```
Change the size of the Polo Shirt
```

### Changing shirt quantity without providing a value

Example 1: Ask to change quantity without specifying the new quantity. You will be prompted to choose a shirt if 
multiple items in the cart and then you will be prompted to provide the quantity.
```
Change the quantity
```

Example 2: You will be prompted to choose a shirt if multiple "Polo Shirts" in the cart (e.g. small one and a large one)
or you will be prompted to choose an item if no items matches "Polo Shirts". Then you will be prompted to provide the 
quantity.
```
Change the quantity of the Polo Shirt
```

## Cancelling the order

Continue on an order.

Example:

```
Cancel this order
```

## Committing the order

Commit the order.

```
Commit my order
```

## Asking for property projections

Property projections are best when there 1 or a few result entities (weather, uber, flightStatus). It is not recommended
when there is a large/unbounded number or result entities. So it is not a good idea to have training examples such as 
below assuming that there are many shirts that can be returned by the provider.

```
What shirt brands do you have?
```

If we wanted to support this kind of Q&A we should write a specific action for it (not actually done for this example):

```
What shirt brands do you have?
```

Just for demonstration purposes a property projection support for property projection is added for the case when user asks
contextually for the total price of an order. To try it out start an order: 

```
Buy a Large Sweatshirt
```

and then ask for the total price:

```
What is the total price of the order
```

---

## Managing Vocabulary and Out-of-Vocabulary Terms

The vocab files help with NL recognition, especially in cases where an utterance is referring to multiple items. For 
example:

``` 
buy a Polo Shirt, Oxford Dress Shirt and V-Neck Tee
```

Note that in the above example ,the only way to distinguish `Polo Shirt` and `Oxford Dress Shirt` is to use vocabulary as 
there is no conjunction word (`and`) separating them and you cannot rely on punctuations such as a comma to 
separate the list of items because Bixby ignores punctuations. 

If your capsule needs to support out-of-vocabulary terms, then you need to add training that include out-of-vocabulary 
items, for example:  `buy foo and bar` or `buy foo and bar and foobar`. Make sure you add add variety of 
out-of-vocabulary examples that mix out-of-vocabulary and vocabulary words. You should also use out-of-vocabulary words of 
different sizes (one token words, two token words, etc.).

You should expect Bixby to learn to pick the correct interpretation for cases where items are 
separated by an "and" or when at least one of the items is in vocabulary (e.g. buy eggs banana", "buy foo bar banana", 
"buy foo bar and bar foo"), otherwise (with proper training) Bixby will merge the two items into one. 

If you need anything more than this then you need to write some code that can take an out of vocab string and parse 
it into one, two or many items (maybe by querying an index of all products in the backend). 

## Additional Resources

### Your Source for Everything Bixby
* [Bixby Developer Center](http://bixbydevelopers.com) - Everything you need to get started with Bixby Development!
* [Bixby News, Blogs and Tutorials](https://bixby.developer.samsung.com/) - Bixby News, Tutorials, Blogs and Events

### Guides & Best Practices
* [Quick Start Guide](https://bixbydevelopers.com/dev/docs/get-started/quick-start) - Build your first capsule
* [Design Guides](https://bixbydevelopers.com/dev/docs/dev-guide/design-guides) - Best practices for designing your capsules
* [Developer Guides](https://bixbydevelopers.com/dev/docs/dev-guide/developers) - Guides that take you from design and modeling all the way through deployment of your capsules

### Bixby Videos
* [Bixby Developers YouTube Channel](https://www.youtube.com/c/bixbydevelopers) - Tutorial videos, Presentations, Capsule Demos and more

### Bixby Podcast
* [Bixby Developers Chat](http://bixbydev.buzzsprout.com/) - Voice, Conversational AI and Bixby discussions 

### Bixby on Social Media
* [@BixbyDevelopers](https://twitter.com/bixbydevelopers) - Twitter
* [Facebook](https://facebook.com/BixbyDevelopers)
* [Instagram](https://www.instagram.com/bixbydevelopers/)

### Need Support?
* Have a feature request? Please suggest it in our [Support Community](https://support.bixbydevelopers.com/hc/en-us/community/topics/360000183273-Feature-Requests) to help us prioritize.
* Have a technical question? Ask on [Stack Overflow](https://stackoverflow.com/questions/tagged/bixby) with tag “bixby”

