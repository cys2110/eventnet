import {useNavigate, useParams} from 'react-router-dom'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faShareFromSquare, faSpeakers, faFireplace, faRestroom} from '@fortawesome/pro-duotone-svg-icons'
import {faCircleHeart as Liked, faRecordVinyl, faCheck } from '@fortawesome/pro-regular-svg-icons'
import {faCircleHeart as Unliked, faStarSharp, faMicrophoneStand } from '@fortawesome/pro-solid-svg-icons'
import { faWifi, faBan, faAnglesDown, faAnglesUp, faCalendarXmark } from '@fortawesome/free-solid-svg-icons'
import userContext from '../../userContext'
import VenueCarousel from '../Main/VenueCarousel'

export default function Venue () {

    const [venue, setVenue] = useState()
    let {id} = useParams()
    const [liked, setLiked] = useState(false)
    const navigate = useNavigate()
    const {user, setUser} = useContext(userContext)
    const {loggedIn} = useContext(userContext)
    const [similar, setSimilar] = useState([])
    const [rules, toggleRules] = useState(false)
    const [cancel, toggleCancel] = useState(false)

    useEffect(() => {
        const getVenues = async() => {
            const response = await axios.get(`http://localhost:3001/venues/id/${id}`)
            setVenue(response.data)
        }
        getVenues()
    }, [])

    useEffect(() => {
        if (venue) {
        const getSimilar = async() => {
            const response = await axios.get(`http://localhost:3001/venues/location/${venue.location._id}`)
            setSimilar(response.data)
        }
        getSimilar()
    }
    }, [venue])

    useEffect(() => {
        if (loggedIn && user[0].venues_liked.includes(id)) {
            setLiked(true)
        } else {
            setLiked(false)
        }
    }, [user])

    const handleLike = async() => {
        if (liked && loggedIn) {
            const updatedArray = user[0].venues_liked.filter(item => item !== id)
            const data = {venues_liked: updatedArray}
            const update = await axios.patch(`http://localhost:3001/users/${user[0]._id}`, data)
            setUser([{...user[0], venues_liked: updatedArray}, user.slice(1)])
            setLiked(false)
        } else if (!liked && loggedIn) {
            const updatedArray = [...user[0].venues_liked, id]
            const data = {venues_liked: updatedArray}
            const update = await axios.patch(`http://localhost:3001/users/${user[0]._id}`, data)
            setUser([{...user[0], venues_liked: updatedArray}, user.slice(1)])
            setLiked(true)
        }
    }

    const showBooking = () => {
        navigate('booking')
    }

    const showRules = () => toggleRules(!rules)
    const showCancel = () => toggleCancel(!cancel)

    if (venue) {
    return (
        <div className="venue-detail-page">
            {/* <VenueCarousel/> */}
            
            <div className="detail-header-container">
                <div className="detail-header-primary">
                    <div className="text-title-32">{venue.name}</div>
                    <div className="header-interaction-icons">
                        <FontAwesomeIcon icon={faShareFromSquare} />
                        { liked ? <FontAwesomeIcon icon={Liked} onClick={handleLike} /> : <FontAwesomeIcon icon={Unliked} onClick={handleLike} /> }
                    </div>
                </div>
                <div className="text-caps-16">{venue.location.city}, {venue.location.state}, {venue.location.country}</div>
                <div className="text-standard-14">{venue.street_address}</div>
                <div className="text-standard-12">Hosted by {venue.owner.first_name ? venue.owner.first_name  : null} {venue.owner.last_name}</div>
                <div className="detail-header-rentals">
                    <div className="header-stars">
                        {[...Array(venue.rating)].map((_, index) =>
                        <FontAwesomeIcon key={index} icon={faStarSharp} /> )}</div>
                </div>
            </div>
            <div className="detail-body">
                { venue.type.map((type, index) => 
                    <div key={index} className="text-title-24-border">{type.environment} {type.type}</div>)}
                    <div className="detail-body-container">
                        <div className="text-standard-14">Venue description goes here. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Distinctio perferendis asperiores explicabo corrupti! Atque est, consequatur doloremque aut maxime ipsa aliquid consequuntur asperiores molestiae aspernatur facere molestias suscipit, exercitationem rerum.</div>
                        <div className="detail-body-bubbles">
                            <div className="text-bubble-black">Impressive sound system</div>
                            <div className="text-bubble-black">Festive atmosphere</div>
                            <div className="text-bubble-black">Highly rated by event hosts</div>
                        </div>
                        <div className="detail-body-bubbles">
                            <div className="text-bubble-white">College reunion</div>
                            <div className="text-bubble-white">Wedding</div>
                            <div className="text-bubble-white">Gala</div>
                        </div>
                    </div>
            </div>
            <div className="text-title-20-border">The Space</div>
            <div className="detail-body-container">
                <div className="text-body-split">
                    <div className="text-standard-14" itemID="text-align-Right">
                        <div>Space:</div>
                        <div>Capacity:</div>
                        <div>Handicap Accessible:</div>
                        <div>Amenities</div>
                    </div>
                    <div className="text-standard-14" itemID="text-align-Left">
                        {venue.type.map(type => 
                            <div key={type._id}>
                                {type.environment} {type.type}
                            </div>)}
                        <div>{venue.max_ppl} people</div>
                        <div><FontAwesomeIcon icon={faCheck} /></div>
                        <div><FontAwesomeIcon icon={faWifi} /> Wifi<br /><FontAwesomeIcon icon={faRestroom} /> Restrooms</div>
                    </div>
                </div>
            </div>
            <div className="text-title-20-border">Special Features</div>
            <div className="detail-body-container">
                <div className="text-standard-14 flexgrid-list">
                    <div><FontAwesomeIcon icon={faSpeakers} /> Sound system</div>
                    <div><FontAwesomeIcon icon={faRecordVinyl} /> Record player</div>
                    <div><FontAwesomeIcon icon={faMicrophoneStand} /> Microphones and microphone stands</div>
                    <div><FontAwesomeIcon icon={faFireplace} /> Fireplace</div>
                </div>
            </div>
            <div className="text-title-20-border">Rental Requirements</div>
            <div className="detail-body-container">
                <div className="text-body-split">
                    <div className="text-standard-14 text-align-Right">
                        <div>Minimum Rental Period:</div>
                        <div>Average Cost:</div>
                    </div>
                    <div className="text-standard-14 text-align-Left">
                        <div>3 hours</div>
                        <div>${venue.price} / hour</div>
                    </div>
                </div>
                <div className="detail-venue-booking-container">
                    <div className="detail-venue-booking" onClick={showBooking} >book venue</div>
                </div>
                <div className="icon-click-boxes">
                    <div className="icon-click-box">
                        <div><FontAwesomeIcon icon={faCalendarXmark} /></div>
                        <div className="text-standard-14" onClick={showRules}>Venue Rules</div>
                        <div onClick={showRules}>{ rules ? <FontAwesomeIcon icon={faAnglesUp} /> : <FontAwesomeIcon icon={faAnglesDown} /> }</div>
                        { rules ? 
                        <div className="rules-list">
                            <FontAwesomeIcon icon={faBan} /> Drug Use
                            <FontAwesomeIcon icon={faBan} /> Smoking
                        </div> : null}
                    </div>
                    <div className="icon-click-box">
                        <div><FontAwesomeIcon icon={faCalendarXmark} /></div>
                        {/* <div className="text-standard-14">Cancellation Policy</div> */}
                        <div className="text-standard-14" onClick={showCancel}>Cancellation Policy</div>
                        <div onClick={showCancel}>{ cancel ? <FontAwesomeIcon icon={faAnglesUp} /> : <FontAwesomeIcon icon={faAnglesDown} /> }</div>
                        { cancel ? 
                        <div className="cancel-list">
                            <div>Cancellations may be made up to 48 hours before the start of the booking. Any cancellations made between 48 and 24 hours before the start of the booking will be charged 50% of the booking fee and any cancellation made under 24 hours' notice will be charged the full booking fee.</div>
                        </div> : null}
                    </div>
                </div>
            </div>
            <div className="text-title-20-border">Similar Venues</div>
            <div className="detail-body-container">
                <div className="search-list-grid">
                    { similar.length > 0 ? similar.map((result, index) => 
                    <div className="search-list-card" key={index}>
                        <div className="location-list-card-image-container">
                            <img className="location-list-card-image" src={result.img[0]}/>
                        </div>
                        <div className="location-list-split">
                            <div className="location-list-info">
                                <div className="location-list-info-primary">
                                    <div className="text-title-24">{result.name}</div>
                                    <div className="text-caps-14">{result.location.city}, {result.location.state}, {result.location.country}</div>
                                    <div className="text-standard-14">{result.type.environment} {result.type.type}</div>
                                </div>
                            </div>
                            <div className="list-card-button-container">
                                <div className="list-card-button-explore">explore</div>
                            </div>
                        </div>
                        
                        
                    </div>) : 'There are no similar venues.'}
                    {/* Possible carousel for similar venues */}
                </div>
                
            </div>
            <button className="detail-button-back">back</button>
        </div>
    ) } else { return <div className="loading">Loading...</div> }
}