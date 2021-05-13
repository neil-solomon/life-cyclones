# Life Cyclones

This is a React app for the front end of the Life Cyclones Online Computer Store (csc 322).

### Setup Development Environment

1. If you don't have it, install [nodejs](https://nodejs.org/en/download/) and [git](https://git-scm.com/downloads).
1. If you don't have a [github](https://github.com/) account, create one.
1. Get the life-cyclones repository.
   1. Open a terminal and navigate to where you want to download.
   1. `git clone https://github.com/neil-solomon/life-cyclones.git` to clone the repository.
1. `cd life-cyclones` to navigate into the repository folder.
1. `npm install` to install dependencies (this may take a few minutes).
1. `npm start` to run the React development server. This will open `http://localhost:3000/` in your default browser.
1. View `React_README.md` to see the README that comes with create-react-app.

### Working with Github

1. Before making changes to the code make sure to pull updates, and then work on a branch other than `main`.
   1. `git pull` to pull updates from Github.
   1. `git branch <branchName>` to create a new branch.
   1. `git checkout <branchName>` to switch to a branch.
1. Save repo after making code changes.
   1. `git add .` to stage all files for commit.
   1. `git commit -m "<message>"` to commit changes to your local repository.
   1. `git push origin <branchName>` to push committed changes to Github.
   1. Github may now ask you to login. If the push fails after login, make sure you accepted the invation to collaborate.
1. The branch that you're working on will later be merged with the `main` branch.

### Project Specs Completed

1. The store manager can select three computer parts.
1. Upon clicking a product on the product page it displays the comments, reviews, price, and it's image. After purchasing a customer can leave a review about the product.
1. A visitor can browse the listings of the computer, parts, and the discussion forums.
1. A visitor can apply to be a registered customer with a unique working email address, the system maintains an “avoid” list of email addresses. If said email address is found to be blacklisted, it will be rejected.
1. A registered customer must provide a credit card in order to add funds to his or her account in order to be able to make a purchase.
1. A registered customer can browse the store as well as make purchases, browse his or her private purchasing history/expenses, can comment and review on items he or she has purchased in the past, and can discuss with other customers or store clerks on the forum. 
1. There are at least 2 delivery companies that will bid on each item in the delivery system, The store clerk can choose between the bids of their choice and provide a justification as to why their choice was made.
1. The delivery company should provide tracking information for the customer to know its whereabouts.
1. A registered customer has an account in the system with information such as available money/credit, home address, purchased computer/items history, and complaints s/he received and filed, votes s/he casted.
1. A registered customer can make a complaint about store clerks, delivery/computer companies, and store managers he/she has dealt with. These complaints are available to the store managers and the clerks and delivery/computer companies that they complained about. the manager can review these complaints and decide whether or not to keep the warning or reverse it, if reversed a customer whose complaint is reversed will receive one warning, if a customer is warned three times they will be removed from the system and put onto the avoid list. A clerk, computer and delivery company that received 3 standing warnings is suspended by the system automatically, the parts of the suspending computer companies and the bidding right of the delivery companies are suspended from the store as well. The store manager has the power to remove any customer and clerk with justifications, even with less than 3 warnings.
1. Teams' creative feature includes our extensive use of a database implemented by back4app and a well designed GUI.
