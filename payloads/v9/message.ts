/**
 * Types extracted from https://discord.com/developers/docs/resources/message
 */

import type { Snowflake } from '../../globals';
import type { APIApplication } from './application';
import type { APIChannel, ChannelType } from './channel';
import type { APIPartialEmoji } from './emoji';
import type { APIInteractionDataResolved, APIMessageInteraction, APIMessageInteractionMetadata } from './interactions';
import type { APIRole } from './permissions';
import type { APIPoll } from './poll';
import type { APISticker, APIStickerItem } from './sticker';
import type { APIUser } from './user';

/**
 * https://discord.com/developers/docs/resources/message#message-object-message-structure
 */
export interface APIMessage {
	/**
	 * ID of the message
	 */
	id: Snowflake;
	/**
	 * ID of the channel the message was sent in
	 */
	channel_id: Snowflake;
	/**
	 * The author of this message (only a valid user in the case where the message is generated by a user or bot user)
	 *
	 * If the message is generated by a webhook, the author object corresponds to the webhook's id,
	 * username, and avatar. You can tell if a message is generated by a webhook by checking for the `webhook_id` property
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object
	 */
	author: APIUser;
	/**
	 * Contents of the message
	 *
	 * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
	 *
	 * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
	 *
	 * See https://support-dev.discord.com/hc/articles/4404772028055
	 */
	content: string;
	/**
	 * When this message was sent
	 */
	timestamp: string;
	/**
	 * When this message was edited (or null if never)
	 */
	edited_timestamp: string | null;
	/**
	 * Whether this was a TTS message
	 */
	tts: boolean;
	/**
	 * Whether this message mentions everyone
	 */
	mention_everyone: boolean;
	/**
	 * Users specifically mentioned in the message
	 *
	 * The `member` field is only present in `MESSAGE_CREATE` and `MESSAGE_UPDATE` events
	 * from text-based guild channels
	 *
	 * See https://discord.com/developers/docs/resources/user#user-object
	 * See https://discord.com/developers/docs/resources/guild#guild-member-object
	 */
	mentions: APIUser[];
	/**
	 * Roles specifically mentioned in this message
	 *
	 * See https://discord.com/developers/docs/topics/permissions#role-object
	 */
	mention_roles: APIRole['id'][];
	/**
	 * Channels specifically mentioned in this message
	 *
	 * Not all channel mentions in a message will appear in `mention_channels`.
	 * - Only textual channels that are visible to everyone in a lurkable guild will ever be included
	 * - Only crossposted messages (via Channel Following) currently include `mention_channels` at all
	 *
	 * If no mentions in the message meet these requirements, this field will not be sent
	 *
	 * See https://discord.com/developers/docs/resources/message#channel-mention-object
	 */
	mention_channels?: APIChannelMention[];
	/**
	 * Any attached files
	 *
	 * See https://discord.com/developers/docs/resources/message#attachment-object-attachment-structure
	 *
	 * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
	 *
	 * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
	 *
	 * See https://support-dev.discord.com/hc/articles/4404772028055
	 */
	attachments: APIAttachment[];
	/**
	 * Any embedded content
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object
	 *
	 * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
	 *
	 * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
	 *
	 * See https://support-dev.discord.com/hc/articles/4404772028055
	 */
	embeds: APIEmbed[];
	/**
	 * Reactions to the message
	 *
	 * See https://discord.com/developers/docs/resources/message#reaction-object
	 */
	reactions?: APIReaction[];
	/**
	 * A nonce that can be used for optimistic message sending (up to 25 characters)
	 *
	 * **You will not receive this from further fetches. This is received only once from a `MESSAGE_CREATE`
	 * event to ensure it got sent**
	 */
	nonce?: number | string;
	/**
	 * Whether this message is pinned
	 */
	pinned: boolean;
	/**
	 * If the message is generated by a webhook, this is the webhook's id
	 */
	webhook_id?: Snowflake;
	/**
	 * Type of message
	 *
	 * See https://discord.com/developers/docs/resources/message#message-object-message-types
	 */
	type: MessageType;
	/**
	 * Sent with Rich Presence-related chat embeds
	 *
	 * See https://discord.com/developers/docs/resources/message#message-object-message-activity-structure
	 */
	activity?: APIMessageActivity;
	/**
	 * Sent with Rich Presence-related chat embeds
	 *
	 * See https://discord.com/developers/docs/resources/application#application-object
	 */
	application?: Partial<APIApplication>;
	/**
	 * If the message is a response to an Interaction, this is the id of the interaction's application
	 */
	application_id?: Snowflake;
	/**
	 * Reference data sent with crossposted messages, replies, pins, and thread starter messages
	 *
	 * See https://discord.com/developers/docs/resources/message#message-reference-structure
	 */
	message_reference?: APIMessageReference;
	/**
	 * Message flags combined as a bitfield
	 *
	 * See https://discord.com/developers/docs/resources/message#message-object-message-flags
	 *
	 * See https://en.wikipedia.org/wiki/Bit_field
	 */
	flags?: MessageFlags;
	/**
	 * The message associated with the `message_reference`
	 *
	 * This field is only returned for messages with a `type` of `19` (REPLY).
	 *
	 * If the message is a reply but the `referenced_message` field is not present,
	 * the backend did not attempt to fetch the message that was being replied to,
	 * so its state is unknown.
	 *
	 * If the field exists but is `null`, the referenced message was deleted
	 *
	 * See https://discord.com/developers/docs/resources/message#message-object
	 */
	referenced_message?: APIMessage | null;
	/**
	 * Sent if the message is sent as a result of an interaction
	 *
	 * @unstable
	 */
	interaction_metadata?: APIMessageInteractionMetadata;
	/**
	 * Sent if the message is a response to an Interaction
	 */
	interaction?: APIMessageInteraction;
	/**
	 * Sent if a thread was started from this message
	 */
	thread?: APIChannel;
	/**
	 * Sent if the message contains components like buttons, action rows, or other interactive components
	 *
	 * The `MESSAGE_CONTENT` privileged gateway intent will become required after **August 31, 2022** for verified applications to receive a non-empty value from this field
	 *
	 * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**
	 *
	 * See https://support-dev.discord.com/hc/articles/4404772028055
	 */
	components?: APIActionRowComponent<APIMessageActionRowComponent>[];
	/**
	 * Sent if the message contains stickers
	 *
	 * See https://discord.com/developers/docs/resources/sticker#sticker-item-object
	 */
	sticker_items?: APIStickerItem[];
	/**
	 * The stickers sent with the message
	 *
	 * See https://discord.com/developers/docs/resources/sticker#sticker-object
	 *
	 * @deprecated Use `sticker_items` instead
	 */
	stickers?: APISticker[];
	/**
	 * A generally increasing integer (there may be gaps or duplicates) that represents the approximate position of the message in a thread
	 *
	 * It can be used to estimate the relative position of the message in a thread in company with `total_message_sent` on parent thread
	 */
	position?: number;
	/**
	 * Data for users, members, channels, and roles in the message's auto-populated select menus
	 *
	 * See https://discord.com/developers/docs/interactions/receiving-and-responding#interaction-object-resolved-data-structure
	 */
	resolved?: APIInteractionDataResolved;
	/**
	 * A poll!
	 *
	 * The `MESSAGE_CONTENT` privileged gateway intent is required for verified applications to receive a non-empty value from this field
	 *
	 * In the Discord Developers Portal, you need to enable the toggle of this intent of your application in **Bot > Privileged Gateway Intents**.
	 * You also need to specify the intent bit value (`1 << 15`) if you are connecting to the gateway
	 *
	 * See https://support-dev.discord.com/hc/articles/4404772028055
	 */
	poll?: APIPoll;
	/**
	 * The message associated with the message_reference. This is a minimal subset of fields in a message (e.g. author is excluded.)
	 */
	message_snapshots?: APIMessageSnapshot[];
	/**
	 * The call associated with the message
	 */
	call?: APIMessageCall;
}

/**
 * https://discord.com/developers/docs/resources/message#message-object-message-types
 */
export enum MessageType {
	Default,
	RecipientAdd,
	RecipientRemove,
	Call,
	ChannelNameChange,
	ChannelIconChange,
	ChannelPinnedMessage,
	UserJoin,
	GuildBoost,
	GuildBoostTier1,
	GuildBoostTier2,
	GuildBoostTier3,
	ChannelFollowAdd,

	GuildDiscoveryDisqualified = 14,
	GuildDiscoveryRequalified,
	GuildDiscoveryGracePeriodInitialWarning,
	GuildDiscoveryGracePeriodFinalWarning,
	ThreadCreated,
	Reply,
	ChatInputCommand,
	ThreadStarterMessage,
	GuildInviteReminder,
	ContextMenuCommand,
	AutoModerationAction,
	RoleSubscriptionPurchase,
	InteractionPremiumUpsell,
	StageStart,
	StageEnd,
	StageSpeaker,
	/**
	 * @unstable https://github.com/discord/discord-api-docs/pull/5927#discussion_r1107678548
	 */
	StageRaiseHand,
	StageTopic,
	GuildApplicationPremiumSubscription,

	GuildIncidentAlertModeEnabled = 36,
	GuildIncidentAlertModeDisabled,
	GuildIncidentReportRaid,
	GuildIncidentReportFalseAlarm,
}

/**
 * https://discord.com/developers/docs/resources/message#message-object-message-activity-structure
 */
export interface APIMessageActivity {
	/**
	 * Type of message activity
	 *
	 * See https://discord.com/developers/docs/resources/message#message-object-message-activity-types
	 */
	type: MessageActivityType;
	/**
	 * `party_id` from a Rich Presence event
	 *
	 * See https://discord.com/developers/docs/rich-presence/how-to#updating-presence-update-presence-payload-fields
	 */
	party_id?: string;
}

/**
 * https://discord.com/developers/docs/resources/message#message-reference-structure
 */
export interface APIMessageReference {
	/**
	 * Type of reference
	 */
	type?: MessageReferenceType;
	/**
	 * ID of the originating message
	 */
	message_id?: Snowflake;
	/**
	 * ID of the originating message's channel
	 */
	channel_id: Snowflake;
	/**
	 * ID of the originating message's guild
	 */
	guild_id?: Snowflake;
}

/**
 * https://discord.com/developers/docs/resources/message#message-object-message-activity-types
 */
export enum MessageActivityType {
	Join = 1,
	Spectate,
	Listen,
	JoinRequest = 5,
}

/**
 * https://discord.com/developers/docs/resources/message#message-reference-types
 */
export enum MessageReferenceType {
	/**
	 * A standard reference used by replies
	 */
	Default = 0,
	/**
	 * Reference used to point to a message at a point in time
	 */
	Forward = 1,
}

/**
 * https://discord.com/developers/docs/resources/message#message-object-message-flags
 */
export enum MessageFlags {
	/**
	 * This message has been published to subscribed channels (via Channel Following)
	 */
	Crossposted = 1 << 0,
	/**
	 * This message originated from a message in another channel (via Channel Following)
	 */
	IsCrosspost = 1 << 1,
	/**
	 * Do not include any embeds when serializing this message
	 */
	SuppressEmbeds = 1 << 2,
	/**
	 * The source message for this crosspost has been deleted (via Channel Following)
	 */
	SourceMessageDeleted = 1 << 3,
	/**
	 * This message came from the urgent message system
	 */
	Urgent = 1 << 4,
	/**
	 * This message has an associated thread, which shares its id
	 */
	HasThread = 1 << 5,
	/**
	 * This message is only visible to the user who invoked the Interaction
	 */
	Ephemeral = 1 << 6,
	/**
	 * This message is an Interaction Response and the bot is "thinking"
	 */
	Loading = 1 << 7,
	/**
	 * This message failed to mention some roles and add their members to the thread
	 */
	FailedToMentionSomeRolesInThread = 1 << 8,
	/**
	 * @unstable This message flag is currently not documented by Discord but has a known value which we will try to keep up to date.
	 */
	ShouldShowLinkNotDiscordWarning = 1 << 10,
	/**
	 * This message will not trigger push and desktop notifications
	 */
	SuppressNotifications = 1 << 12,
	/**
	 * This message is a voice message
	 */
	IsVoiceMessage = 1 << 13,
}

/**
 * https://discord.com/developers/docs/resources/message#message-call-object-message-call-object-structure
 */
export interface APIMessageCall {
	/**
	 * Array of user ids that participated in the call
	 */
	participants: Snowflake[];
	/**
	 * ISO8601 timestamp when the call ended
	 */
	ended_timestamp?: string | null;
}

/**
 * https://discord.com/developers/docs/resources/message#message-snapshot-object
 */
export interface APIMessageSnapshot {
	/**
	 * Subset of the message object fields
	 */
	message: APIMessageSnapshotFields;
	/**
	 * Id of the origin message's guild
	 */
	guild_id?: Snowflake;
}

/**
 * https://discord.com/developers/docs/resources/message#reaction-object-reaction-structure
 */
export interface APIReaction {
	/**
	 * Total number of times this emoji has been used to react (including super reacts)
	 */
	count: number;
	/**
	 * An object detailing the individual reaction counts for different types of reactions
	 */
	count_details: APIReactionCountDetails;
	/**
	 * Whether the current user reacted using this emoji
	 */
	me: boolean;
	/**
	 * Whether the current user super-reacted using this emoji
	 */
	me_burst: boolean;
	/**
	 * Emoji information
	 *
	 * See https://discord.com/developers/docs/resources/emoji#emoji-object
	 */
	emoji: APIPartialEmoji;
	/**
	 * Hexadecimal colors used for this super reaction
	 */
	burst_colors: string[];
}

/**
 * https://discord.com/developers/docs/resources/message#reaction-count-details-object-reaction-count-details-structure
 */
export interface APIReactionCountDetails {
	/**
	 * Count of super reactions
	 */
	burst: number;
	/**
	 * Count of normal reactions
	 */
	normal: number;
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-structure
 *
 * Length limit: 6000 characters
 */
export interface APIEmbed {
	/**
	 * Title of embed
	 *
	 * Length limit: 256 characters
	 */
	title?: string;
	/**
	 * Type of embed (always "rich" for webhook embeds)
	 *
	 * @deprecated *Embed types should be considered deprecated and might be removed in a future API version*
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-types
	 */
	type?: EmbedType;
	/**
	 * Description of embed
	 *
	 * Length limit: 4096 characters
	 */
	description?: string;
	/**
	 * URL of embed
	 */
	url?: string;
	/**
	 * Timestamp of embed content
	 */
	timestamp?: string;
	/**
	 * Color code of the embed
	 */
	color?: number;
	/**
	 * Footer information
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-footer-structure
	 */
	footer?: APIEmbedFooter;
	/**
	 * Image information
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-image-structure
	 */
	image?: APIEmbedImage;
	/**
	 * Thumbnail information
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-thumbnail-structure
	 */
	thumbnail?: APIEmbedThumbnail;
	/**
	 * Video information
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-video-structure
	 */
	video?: APIEmbedVideo;
	/**
	 * Provider information
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-provider-structure
	 */
	provider?: APIEmbedProvider;
	/**
	 * Author information
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-author-structure
	 */
	author?: APIEmbedAuthor;
	/**
	 * Fields information
	 *
	 * Length limit: 25 field objects
	 *
	 * See https://discord.com/developers/docs/resources/message#embed-object-embed-field-structure
	 */
	fields?: APIEmbedField[];
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-types
 *
 * @deprecated *Embed types should be considered deprecated and might be removed in a future API version*
 */
export enum EmbedType {
	/**
	 * Generic embed rendered from embed attributes
	 */
	Rich = 'rich',
	/**
	 * Image embed
	 */
	Image = 'image',
	/**
	 * Video embed
	 */
	Video = 'video',
	/**
	 * Animated gif image embed rendered as a video embed
	 */
	GIFV = 'gifv',
	/**
	 * Article embed
	 */
	Article = 'article',
	/**
	 * Link embed
	 */
	Link = 'link',
	/**
	 * Auto moderation alert embed
	 *
	 * @unstable This embed type is currently not documented by Discord, but it is returned in the auto moderation system messages.
	 */
	AutoModerationMessage = 'auto_moderation_message',
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-thumbnail-structure
 */
export interface APIEmbedThumbnail {
	/**
	 * Source url of thumbnail (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * A proxied url of the thumbnail
	 */
	proxy_url?: string;
	/**
	 * Height of thumbnail
	 */
	height?: number;
	/**
	 * Width of thumbnail
	 */
	width?: number;
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-video-structure
 */
export interface APIEmbedVideo {
	/**
	 * Source url of video
	 */
	url?: string;
	/**
	 * A proxied url of the video
	 */
	proxy_url?: string;
	/**
	 * Height of video
	 */
	height?: number;
	/**
	 * Width of video
	 */
	width?: number;
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-image-structure
 */
export interface APIEmbedImage {
	/**
	 * Source url of image (only supports http(s) and attachments)
	 */
	url: string;
	/**
	 * A proxied url of the image
	 */
	proxy_url?: string;
	/**
	 * Height of image
	 */
	height?: number;
	/**
	 * Width of image
	 */
	width?: number;
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-provider-structure
 */
export interface APIEmbedProvider {
	/**
	 * Name of provider
	 */
	name?: string;
	/**
	 * URL of provider
	 */
	url?: string;
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-author-structure
 */
export interface APIEmbedAuthor {
	/**
	 * Name of author
	 *
	 * Length limit: 256 characters
	 */
	name: string;
	/**
	 * URL of author
	 */
	url?: string;
	/**
	 * URL of author icon (only supports http(s) and attachments)
	 */
	icon_url?: string;
	/**
	 * A proxied url of author icon
	 */
	proxy_icon_url?: string;
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-footer-structure
 */
export interface APIEmbedFooter {
	/**
	 * Footer text
	 *
	 * Length limit: 2048 characters
	 */
	text: string;
	/**
	 * URL of footer icon (only supports http(s) and attachments)
	 */
	icon_url?: string;
	/**
	 * A proxied url of footer icon
	 */
	proxy_icon_url?: string;
}

/**
 * https://discord.com/developers/docs/resources/message#embed-object-embed-field-structure
 */
export interface APIEmbedField {
	/**
	 * Name of the field
	 *
	 * Length limit: 256 characters
	 */
	name: string;
	/**
	 * Value of the field
	 *
	 * Length limit: 1024 characters
	 */
	value: string;
	/**
	 * Whether or not this field should display inline
	 */
	inline?: boolean;
}

/**
 * https://discord.com/developers/docs/resources/message#attachment-object-attachment-structure
 */
export interface APIAttachment {
	/**
	 * Attachment id
	 */
	id: Snowflake;
	/**
	 * Name of file attached
	 */
	filename: string;
	/**
	 * The title of the file
	 */
	title?: string;
	/**
	 * Description for the file
	 */
	description?: string;
	/**
	 * The attachment's media type
	 *
	 * See https://en.wikipedia.org/wiki/Media_type
	 */
	content_type?: string;
	/**
	 * Size of file in bytes
	 */
	size: number;
	/**
	 * Source url of file
	 */
	url: string;
	/**
	 * A proxied url of file
	 */
	proxy_url: string;
	/**
	 * Height of file (if image)
	 */
	height?: number | null;
	/**
	 * Width of file (if image)
	 */
	width?: number | null;
	/**
	 * Whether this attachment is ephemeral
	 */
	ephemeral?: boolean;
	/**
	 * The duration of the audio file (currently for voice messages)
	 */
	duration_secs?: number;
	/**
	 * Base64 encoded bytearray representing a sampled waveform (currently for voice messages)
	 */
	waveform?: string;
	/**
	 * Attachment flags combined as a bitfield
	 */
	flags?: AttachmentFlags;
}

/**
 * https://discord.com/developers/docs/resources/message#attachment-object-attachment-flags
 */
export enum AttachmentFlags {
	/**
	 * This attachment has been edited using the remix feature on mobile
	 */
	IsRemix = 1 << 2,
}

/**
 * https://discord.com/developers/docs/resources/message#channel-mention-object-channel-mention-structure
 */
export interface APIChannelMention {
	/**
	 * ID of the channel
	 */
	id: Snowflake;
	/**
	 * ID of the guild containing the channel
	 */
	guild_id: Snowflake;
	/**
	 * The type of channel
	 *
	 * See https://discord.com/developers/docs/resources/channel#channel-object-channel-types
	 */
	type: ChannelType;
	/**
	 * The name of the channel
	 */
	name: string;
}

/**
 * https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mention-types
 */
export enum AllowedMentionsTypes {
	/**
	 * Controls @everyone and @here mentions
	 */
	Everyone = 'everyone',
	/**
	 * Controls role mentions
	 */
	Role = 'roles',
	/**
	 * Controls user mentions
	 */
	User = 'users',
}

/**
 * https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mentions-structure
 */
export interface APIAllowedMentions {
	/**
	 * An array of allowed mention types to parse from the content
	 *
	 * See https://discord.com/developers/docs/resources/message#allowed-mentions-object-allowed-mention-types
	 */
	parse?: AllowedMentionsTypes[];
	/**
	 * Array of role_ids to mention (Max size of 100)
	 */
	roles?: Snowflake[];
	/**
	 * Array of user_ids to mention (Max size of 100)
	 */
	users?: Snowflake[];
	/**
	 * 	For replies, whether to mention the author of the message being replied to (default false)
	 *
	 * @default false
	 */
	replied_user?: boolean;
}

/**
 * https://discord.com/developers/docs/interactions/message-components#component-object
 */
export interface APIBaseComponent<T extends ComponentType> {
	/**
	 * The type of the component
	 */
	type: T;
}

/**
 * https://discord.com/developers/docs/interactions/message-components#component-object-component-types
 */
export enum ComponentType {
	/**
	 * Action Row component
	 */
	ActionRow = 1,
	/**
	 * Button component
	 */
	Button,
	/**
	 * Select menu for picking from defined text options
	 */
	StringSelect,
	/**
	 * Text Input component
	 */
	TextInput,
	/**
	 * Select menu for users
	 */
	UserSelect,
	/**
	 * Select menu for roles
	 */
	RoleSelect,
	/**
	 * Select menu for users and roles
	 */
	MentionableSelect,
	/**
	 * Select menu for channels
	 */
	ChannelSelect,

	// EVERYTHING BELOW THIS LINE SHOULD BE OLD NAMES FOR RENAMED ENUM MEMBERS //

	/**
	 * Select menu for picking from defined text options
	 *
	 * @deprecated This is the old name for {@apilink ComponentType#StringSelect}
	 */
	SelectMenu = 3,
}

/**
 * https://discord.com/developers/docs/interactions/message-components#action-rows
 */
export interface APIActionRowComponent<T extends APIActionRowComponentTypes>
	extends APIBaseComponent<ComponentType.ActionRow> {
	/**
	 * The components in the ActionRow
	 */
	components: T[];
}

/**
 * https://discord.com/developers/docs/interactions/message-components#buttons
 */
export interface APIButtonComponentBase<Style extends ButtonStyle> extends APIBaseComponent<ComponentType.Button> {
	/**
	 * The label to be displayed on the button
	 */
	label?: string;
	/**
	 * The style of the button
	 */
	style: Style;
	/**
	 * The emoji to display to the left of the text
	 */
	emoji?: APIMessageComponentEmoji;
	/**
	 * The status of the button
	 */
	disabled?: boolean;
}

export interface APIMessageComponentEmoji {
	/**
	 * Emoji id
	 */
	id?: Snowflake;
	/**
	 * Emoji name
	 */
	name?: string;
	/**
	 * Whether this emoji is animated
	 */
	animated?: boolean;
}

export interface APIButtonComponentWithCustomId
	extends APIButtonComponentBase<
		ButtonStyle.Danger | ButtonStyle.Primary | ButtonStyle.Secondary | ButtonStyle.Success
	> {
	/**
	 * The custom_id to be sent in the interaction when clicked
	 */
	custom_id: string;
}

export interface APIButtonComponentWithURL extends APIButtonComponentBase<ButtonStyle.Link> {
	/**
	 * The URL to direct users to when clicked for Link buttons
	 */
	url: string;
}

export interface APIButtonComponentWithSKUId
	extends Omit<APIButtonComponentBase<ButtonStyle.Premium>, 'custom_id' | 'emoji' | 'label'> {
	/**
	 * The id for a purchasable SKU
	 */
	sku_id: Snowflake;
}

export type APIButtonComponent =
	| APIButtonComponentWithCustomId
	| APIButtonComponentWithSKUId
	| APIButtonComponentWithURL;

/**
 * https://discord.com/developers/docs/interactions/message-components#button-object-button-styles
 */
export enum ButtonStyle {
	Primary = 1,
	Secondary,
	Success,
	Danger,
	Link,
	Premium,
}

/**
 * https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-styles
 */
export enum TextInputStyle {
	Short = 1,
	Paragraph,
}

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menus
 */
export interface APIBaseSelectMenuComponent<
	T extends
		| ComponentType.ChannelSelect
		| ComponentType.MentionableSelect
		| ComponentType.RoleSelect
		| ComponentType.StringSelect
		| ComponentType.UserSelect,
> extends APIBaseComponent<T> {
	/**
	 * A developer-defined identifier for the select menu, max 100 characters
	 */
	custom_id: string;
	/**
	 * Custom placeholder text if nothing is selected, max 150 characters
	 */
	placeholder?: string;
	/**
	 * The minimum number of items that must be chosen; min 0, max 25
	 *
	 * @default 1
	 */
	min_values?: number;
	/**
	 * The maximum number of items that can be chosen; max 25
	 *
	 * @default 1
	 */
	max_values?: number;
	/**
	 * Disable the select
	 *
	 * @default false
	 */
	disabled?: boolean;
}

export interface APIBaseAutoPopulatedSelectMenuComponent<
	T extends
		| ComponentType.ChannelSelect
		| ComponentType.MentionableSelect
		| ComponentType.RoleSelect
		| ComponentType.UserSelect,
	D extends SelectMenuDefaultValueType,
> extends APIBaseSelectMenuComponent<T> {
	/**
	 * List of default values for auto-populated select menu components
	 */
	default_values?: APISelectMenuDefaultValue<D>[];
}

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menus
 */
export interface APIStringSelectComponent extends APIBaseSelectMenuComponent<ComponentType.StringSelect> {
	/**
	 * Specified choices in a select menu; max 25
	 */
	options: APISelectMenuOption[];
}

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menus
 */
export type APIUserSelectComponent = APIBaseAutoPopulatedSelectMenuComponent<
	ComponentType.UserSelect,
	SelectMenuDefaultValueType.User
>;

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menus
 */
export type APIRoleSelectComponent = APIBaseAutoPopulatedSelectMenuComponent<
	ComponentType.RoleSelect,
	SelectMenuDefaultValueType.Role
>;

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menus
 */
export type APIMentionableSelectComponent = APIBaseAutoPopulatedSelectMenuComponent<
	ComponentType.MentionableSelect,
	SelectMenuDefaultValueType.Role | SelectMenuDefaultValueType.User
>;

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menus
 */
export interface APIChannelSelectComponent
	extends APIBaseAutoPopulatedSelectMenuComponent<ComponentType.ChannelSelect, SelectMenuDefaultValueType.Channel> {
	/**
	 * List of channel types to include in the ChannelSelect component
	 */
	channel_types?: ChannelType[];
}

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure
 */
export enum SelectMenuDefaultValueType {
	Channel = 'channel',
	Role = 'role',
	User = 'user',
}

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-default-value-structure
 */
export interface APISelectMenuDefaultValue<T extends SelectMenuDefaultValueType> {
	type: T;
	id: Snowflake;
}

export type APIAutoPopulatedSelectMenuComponent =
	| APIChannelSelectComponent
	| APIMentionableSelectComponent
	| APIRoleSelectComponent
	| APIUserSelectComponent;

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menus
 */
export type APISelectMenuComponent =
	| APIChannelSelectComponent
	| APIMentionableSelectComponent
	| APIRoleSelectComponent
	| APIStringSelectComponent
	| APIUserSelectComponent;

/**
 * https://discord.com/developers/docs/interactions/message-components#select-menu-object-select-option-structure
 */
export interface APISelectMenuOption {
	/**
	 * The user-facing name of the option (max 100 chars)
	 */
	label: string;
	/**
	 * The dev-defined value of the option (max 100 chars)
	 */
	value: string;
	/**
	 * An additional description of the option (max 100 chars)
	 */
	description?: string;
	/**
	 * The emoji to display to the left of the option
	 */
	emoji?: APIMessageComponentEmoji;
	/**
	 * Whether this option should be already-selected by default
	 */
	default?: boolean;
}

/**
 * https://discord.com/developers/docs/interactions/message-components#text-inputs-text-input-structure
 */
export interface APITextInputComponent extends APIBaseComponent<ComponentType.TextInput> {
	/**
	 * One of text input styles
	 */
	style: TextInputStyle;
	/**
	 * The custom id for the text input
	 */
	custom_id: string;
	/**
	 * Text that appears on top of the text input field, max 45 characters
	 */
	label: string;
	/**
	 * Placeholder for the text input
	 */
	placeholder?: string;
	/**
	 * The pre-filled text in the text input
	 */
	value?: string;
	/**
	 * Minimal length of text input
	 */
	min_length?: number;
	/**
	 * Maximal length of text input
	 */
	max_length?: number;
	/**
	 * Whether or not this text input is required or not
	 */
	required?: boolean;
}

/**
 * https://discord.com/developers/docs/interactions/message-components#message-components
 */
export type APIMessageComponent = APIActionRowComponent<APIMessageActionRowComponent> | APIMessageActionRowComponent;
export type APIModalComponent = APIActionRowComponent<APIModalActionRowComponent> | APIModalActionRowComponent;

export type APIActionRowComponentTypes = APIMessageActionRowComponent | APIModalActionRowComponent;

/**
 * https://discord.com/developers/docs/interactions/message-components#message-components
 */
export type APIMessageActionRowComponent = APIButtonComponent | APISelectMenuComponent;

// Modal components
export type APIModalActionRowComponent = APITextInputComponent;

export type APIMessageSnapshotFields = Pick<
	APIMessage,
	| 'attachments'
	| 'content'
	| 'edited_timestamp'
	| 'embeds'
	| 'flags'
	| 'mention_roles'
	| 'mentions'
	| 'timestamp'
	| 'type'
>;
