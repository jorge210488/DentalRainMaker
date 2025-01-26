import { Avatar, AvatarImage, AvatarFallback } from '@radix-ui/react-avatar'

function UserProfileAvatar() {
  return (
    <Avatar>
      <AvatarImage src='/path-to-profile-image.jpg' alt='User Profile' />
      <AvatarFallback>U</AvatarFallback>
    </Avatar>
  )
}
