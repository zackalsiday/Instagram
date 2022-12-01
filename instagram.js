class Instagram {
    constructor() {
        this.photos = {} // list of photos every user has 
        this.followers = {} // list of people that are following each user 
        this.followee = {} // list of people that each user is following 
    }


    postPhoto(userId, photoId) {
        // Write code here...
        // console.log(this.photos)
        if (this.photos[userId]) {
            this.photos[userId].push(photoId)
        } else {
            this.photos[userId] = [photoId]
        }

    }

    getFeed(userId) {
        let feed = this.photos[userId]
        let listOfFollowees = this.followee[userId]
        // console.log(listOfFollowees)
        if (listOfFollowees !== undefined) {
            for (let i = 0; i <= listOfFollowees.length - 1; i++) {
                let followeeId = listOfFollowees[i]
                feed = feed.concat(this.photos[followeeId])
            }
        }
        // console.log(feed)
        feed.sort()
        feed.reverse()
        return feed.slice(0, 10)
    }

    follow(followerId, followeeId) {
        if (this.followee[followerId]) {
            this.followee[followerId].push(followeeId)
        } else {
            this.followee[followerId] = [followeeId]
        }

        if (this.followers[followeeId]) {
            this.followers[followeeId].push(followerId)
        } else {
            this.followers[followeeId] = [followerId]
        }
    }

    unfollow(followerId, followeeId) {
        if (this.followee[followerId]) {
            this.followee[followerId].shift(followeeId)
        } else {
            return null
        }

        if (this.followers[followeeId]) {
            this.followers[followeeId].shift(followerId)
        } else {
            return null
        }
    }

}

// Test Case
const instagram = new Instagram();
// console.log(instagram)
instagram.postPhoto(1, 11) // User with id=1 posts a photo with id=11
console.log(instagram.getFeed(1))// returns [11]
instagram.postPhoto(2, 12) // User with id=2 posts a photo with id=12
console.log(instagram.getFeed(1)) // returns [11]
instagram.follow(1, 2) // User 1 follows User 2
instagram.postPhoto(3, 13) // User with id=3 posts a photo with id=13
instagram.postPhoto(3, 14) // User with id=3 posts a photo with id=14
instagram.postPhoto(3, 15) // User with id=3 posts a photo with id=15
instagram.postPhoto(3, 16) // User with id=3 posts a photo with id=16
instagram.postPhoto(3, 17) // User with id=3 posts a photo with id=17
instagram.postPhoto(3, 18) // User with id=3 posts a photo with id=18
instagram.postPhoto(3, 19) // User with id=3 posts a photo with id=19
console.log(instagram.getFeed(2)) // returns [12]
instagram.follow(2, 3) // User 2 follows User 3
console.log(instagram.getFeed(2)) // returns [19, 18, 17, 16, 15, 14, 13, 12]
instagram.postPhoto(4, 20) // User with id=4 posts a photo with id=20
instagram.postPhoto(4, 21) // User with id=4 posts a photo with id=21
instagram.postPhoto(4, 22) // User with id=4 posts a photo with id=22
instagram.postPhoto(4, 23) // User with id=4 posts a photo with id=23
instagram.follow(2, 4) // User 2 follows User 4
console.log(instagram.getFeed(2)) // returns [23, 22, 21, 20, 19, 18, 17, 16, 15, 14]
instagram.unfollow(2, 3) // User 2 unfollows User 3
console.log(instagram.getFeed(2)) // returns [ 23, 22, 21, 20, 12 ]
instagram.unfollow(2, 4) // User 2 unfollows User 4
console.log(instagram.getFeed(2)) // returns [ 12 ]