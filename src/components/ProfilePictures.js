
function ProfilePictures({ imageUrls , dimensions , requestedCount }) {
  const maxVisibleImages = 3 // Maximum number of images to display
  return (
    <div id="profilePictures" className="CircularPro" style={{ display: 'flex', alignItems: 'center' }}>
      {imageUrls.slice(0, maxVisibleImages).map((url, index) => (
        <img
          key={index}
          src={url}
          alt="Profile"
          onError={(e) => { e.target.src = '/profile.png'; }}
          style={{
            width: dimensions,
            height: dimensions,
            borderRadius: '50%',
            marginLeft: index > 0 ? '-30px' : '0' // Adjust spacing as needed
          }}
        />
      ))}

      {requestedCount > maxVisibleImages && (
        <div
          style={{
            width: 50, // Allow width to adjust automatically
            height: 50,
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #CCCCCC',
            marginLeft: '-30px' // Space between images and text
          }}
        >
          +{requestedCount - maxVisibleImages}
        </div>
      )}
    </div>
  )
}

export default ProfilePictures
