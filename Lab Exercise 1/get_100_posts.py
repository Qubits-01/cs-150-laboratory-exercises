import praw


reddit = praw.Reddit(
    client_id="KL1wzoFGF082N_0blGBX1Q",  # Change this to your Client ID
    client_secret="ZB-sahS1gZeJp5j77A2lltBfNS-CvQ",  # Change this to your Client Secret
    password="PogiNiDerick",  # Change this to your Reddit account password
    user_agent="testscript by u/GDSC-Diliman",  # Change this to "testscript by u/(your username)"
    username="GDSC-Diliman",  # Change this to your username
)

new_posts = list(reddit.front.new())  # `reddit.front.new()` returns the first
# 100 posts in the /new feed;
# no need for list(...) if you will
# loop through the posts just once

for n, post in enumerate(new_posts, start=1):  # Research on what the built-in
    print(f"{n}: {post.title}\n")  # function `enumerate` does if
    # you are unfamiliar with it

# Alternative: `if new_posts:` and `new_posts[0]`
for post in new_posts:
    print(f'Upvoting the post from r/{post.subreddit} with title "{post.title}"...')
    post.upvote()

    print("Exiting the loop...")
    break
