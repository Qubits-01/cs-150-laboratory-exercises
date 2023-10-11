import flet as ft
import praw


reddit = praw.Reddit(  # Before submission, revert all strings below to "..."
    client_id="...",  # Change this to your Client ID
    client_secret="...",  # Change this to your Client Secret
    password="...",  # Change this to your Reddit account password
    user_agent="...",  # Change this to "testscript by u/(your username)"
    username="...",  # Change this to your username
)


def main(page):
    page.title = "CS 150 23.1 Lab 1"
    page.vertical_alignment = ft.MainAxisAlignment.CENTER  # For layouting; ignore

    controls = []

    for post in reddit.front.new():

        def upvote_closure(post):
            def upvote_arrow_click(_):
                print(f"{post.title}")

                nonlocal likes
                nonlocal score

                if likes is True:
                    print("Removing upvote...")
                    post.clear_vote()
                    score -= 1
                elif likes is False:
                    print(f"Upvoting post (from downvote): {post.title}")
                    post.clear_vote()
                    post.upvote()
                    score += 2
                else:
                    print(f"Upvoting post: {post.title}")
                    post.upvote()
                    score += 1

                page.update()  # Updates the screen with any new content

            return upvote_arrow_click

        def downvote_closure(post):
            def downvote_arrow_click(_):
                print(f"{post.title}")

                if post.likes is True:
                    print(f"Downvoting post (from upvote): {post.title}")
                    post.clear_vote()
                    post.downvote()
                    post.score -= 2
                elif post.likes is False:
                    print("Removing downvote...")
                    post.clear_vote()
                    post.score += 1
                else:
                    print(f"Downvoting post: {post.title}")
                    post.downvote()
                    post.score -= 1

                page.update()  # Updates the screen with any new content

            return downvote_arrow_click

        likes = post.likes
        score = post.score

        def control_ui_closure(likes, score):
            def inner():
                upvote_arrow = ft.IconButton(
                    icon="arrow_upward",
                    icon_color="orange" if likes else "grey",
                    on_click=upvote_closure(post),
                )

                score_text = ft.Text(
                    str(score),
                    color="orange" if likes else "blue" if likes is False else "grey",
                )

                downvote_arrow = ft.IconButton(
                    icon="arrow_downward",
                    icon_color="blue" if likes is False else "grey",
                    on_click=downvote_closure(post),
                )

                return [upvote_arrow, score_text, downvote_arrow]

            return inner

        controls.append(
            ft.Card(
                ft.Row(
                    [
                        ft.Column(
                            control_ui_closure(likes, score)(),
                            horizontal_alignment=ft.CrossAxisAlignment.CENTER,
                            width=80,  # For layouting; ignore
                        ),
                        ft.Text(
                            post.title,
                            max_lines=2,  # For layouting; ignore
                            expand=1,  # For layouting; ignore
                        ),
                    ],
                ),
            ),
        )

    page.add(
        ft.ListView(
            controls,
            expand=1,  # For layouting; ignore
            spacing=10,  # For layouting; ignore
            padding=20,  # For layouting; ignore
        )
    )


ft.app(target=main)
