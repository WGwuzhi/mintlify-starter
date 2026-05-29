declare namespace AutClawMiddleware {
  export type Primitive = string | number | boolean | null
  export type JsonValue = Primitive | JsonObject | JsonValue[]
  export interface JsonObject { [key: string]: JsonValue }

  export interface RuntimeResponse<T = unknown> {
    code: number
    message: string
    data: T
    request_id?: string
  }

  export interface SendReceipt {
    ok: boolean
    message_id?: string
    messageid?: string
    message_ids?: string[]
    raw?: unknown
    error?: string
    action?: string
    [key: string]: unknown
  }

  export interface TargetOptions {
    imType?: string
    imtype?: string
    im_type?: string
    accountID?: string
    accountId?: string
    account_id?: string
    sessionType?: 'private' | 'group' | string
    userID?: string
    userId?: string
    user_id?: string
    groupID?: string
    groupId?: string
    group_id?: string
    chatID?: string
    chatId?: string
    chat_id?: string
    [key: string]: unknown
  }

  export interface MediaOptions {
    caption?: string
    filename?: string
    fileName?: string
    file_name?: string
    mimeType?: string
    mime_type?: string
    cover?: string
    target?: TargetOptions
    constraints?: Record<string, unknown>
    options?: Record<string, unknown>
    timeout?: number
    [key: string]: unknown
  }

  export interface MediaItem {
    type: 'text' | 'markdown' | 'image' | 'voice' | 'video' | 'file' | string
    text?: string
    source?: string
    url?: string
    path?: string
    file?: string
    name?: string
    file_name?: string
    filename?: string
    mime_type?: string
    mimeType?: string
    caption?: string
    cover?: string
    platform_payload?: Record<string, unknown>
    [key: string]: unknown
  }

  export interface FileDownloadResult {
    path: string
    file_path: string
    file_name: string
    mime_type?: string
    file_size?: number
    ok?: boolean
    url?: string
    action?: string
    [key: string]: unknown
  }

  export interface GroupMember {
    group_id?: string
    user_id?: string
    nickname?: string
    card?: string
    display_name?: string
    sex?: string
    age?: number
    area?: string
    join_time?: number
    last_sent_time?: number
    level?: string
    role?: string
    unfriendly?: boolean
    title?: string
    title_expire_time?: number
    card_changeable?: boolean
    shut_up_timestamp?: number
    raw?: unknown
    [key: string]: unknown
  }

  export interface GroupMemberListResult {
    ok: boolean
    im_type?: string
    account_id?: string
    group_id: string
    members: GroupMember[]
    raw?: unknown
    [key: string]: unknown
  }

  export interface GroupMemberListOptions {
    group_id?: string
    groupID?: string
    groupId?: string
    groupCode?: string
    group_code?: string
    group?: string
    chat_id?: string
    chatID?: string
    imType?: string
    im_type?: string
    accountID?: string
    account_id?: string
    noCache?: boolean
    no_cache?: boolean
    rawResult?: boolean
    raw_result?: boolean
    includeRaw?: boolean
    raw?: boolean
    [key: string]: unknown
  }

  export interface ImportModuleOptions {
    package?: string
    version?: string
    manager?: string
  }

  export interface WaitPaymentSuccess {
    event_type?: string
    event_category?: string
    payment_channel?: string
    payment_type?: string
    money?: string | number
    Money?: string | number
    received_amount?: string | number
    expected_amount?: number
    amount_matched?: boolean
    order_id?: string
    orderID?: string
    trade_no?: string
    time?: string
    [key: string]: unknown
  }

  export type WaitResult = string | Record<string, unknown>
  export type WaitPayResult = 'timeout' | 'busy' | string | WaitPaymentSuccess

  export interface VersionInfo {
    version?: string
    commit?: string
    build_time?: string
    runtime?: string
    [key: string]: unknown
  }

  export class Sender {
    constructor(senderID: string)

    bucketGet(bucket: string, key: string): Promise<unknown>
    bucketSet(bucket: string, key: string, value: unknown): Promise<unknown>
    bucketDel(bucket: string, key: string): Promise<unknown>
    bucketKeys(bucket: string, value?: unknown): Promise<string[]>
    bucketAllKeys(bucket: string): Promise<string[]>
    bucketAll(bucket: string): Promise<Record<string, unknown>>

    setContinue(): Promise<boolean>

    getRouterPath(): Promise<string>
    getRouter(): Promise<string>
    getRouterParams(): Promise<Record<string, string>>
    getRouterMethod(): Promise<string>
    getMethod(): Promise<string>
    getRouterHeaders(): Promise<Record<string, string | string[]>>
    getRouterCookies(): Promise<Record<string, string>>
    getRouterBody(): Promise<unknown>
    getRouterData(): Promise<string>
    response(data: unknown): Promise<boolean>

    getImtype(): Promise<string>
    getUserID(): Promise<string>
    getUserName(): Promise<string>
    getUserAvatarUrl(): Promise<string>
    getChatID(): Promise<string>
    getChatName(): Promise<string>
    getGroupName(): Promise<string>
    isAdmin(): Promise<boolean>
    isAI(): Promise<boolean>
    getAIParam(): Promise<string>
    getMessage(): Promise<string>
    getMessageID(): Promise<string>
    getHistoryMessageIDs(number: number): Promise<string[]>

    recallMessage(messageid: string): Promise<SendReceipt>
    breakIn(content: string): Promise<unknown>
    param(index: number): Promise<string>

    reply(text: string): Promise<SendReceipt>
    returnValue(text: string): Promise<unknown>
    replyMarkdown(markdown: string): Promise<SendReceipt>
    replyImage(source: string, options?: MediaOptions): Promise<SendReceipt>
    replyVoice(source: string, options?: MediaOptions): Promise<SendReceipt>
    replyVideo(source: string, options?: MediaOptions): Promise<SendReceipt>
    replyFile(source: string, options?: MediaOptions): Promise<SendReceipt>
    replyMixed(items: MediaItem[], options?: MediaOptions): Promise<SendReceipt>

    listen(waitTime: number, recallTime?: number | 'group', scope?: 'group' | string): Promise<WaitResult>
    input(waitTime: number, recallTime?: number | 'group', scope?: 'group' | string): Promise<WaitResult>
    waitPay(exitcode: string, timeout: number, amount?: string | number): Promise<WaitPayResult>
    atWaitPay(): Promise<boolean>

    groupInviteIn(friend: string, group: string): void
    groupKick(userid: string): void
    groupBan(userid: string, timeout: number): void
    groupUnban(userid: string): void
    groupWholeBan(): void
    groupWholeUnban(): void
    groupNoticeSend(notice: string): void

    getPluginName(): Promise<string>
    getPluginVersion(): Promise<string>
    getEventType(): Promise<string>
    setEventType(eventType: string): Promise<boolean>
    getEventData(): Promise<unknown>
    setEventData(eventData: unknown): Promise<boolean>
    getMediaItems(): Promise<MediaItem[]>
  }

  export class Cron {
    getCrons(): Promise<unknown[]>
    getCron(id: string | number): Promise<unknown>
    addCron(
      cron: string,
      isOnce?: boolean,
      cmd?: string,
      isToSelf?: boolean,
      toOthers?: unknown,
      memo?: string,
      disguiseImtype?: string,
      disguiseGroup?: string,
      disguiseUser?: string,
    ): void
    updateCron(
      id: string | number,
      cron: string,
      isOnce?: boolean,
      cmd?: string,
      isToSelf?: boolean,
      toOthers?: unknown,
      memo?: string,
      disguiseImtype?: string,
      disguiseGroup?: string,
      disguiseUser?: string,
    ): void
    delCron(id: string | number): void
  }
}

declare const middleware: {
  Sender: typeof AutClawMiddleware.Sender
  Cron: typeof AutClawMiddleware.Cron

  getSenderID(): string
  render(template: string, selector: string, data: unknown): Promise<unknown>
  getActiveImtypes(): Promise<string[]>

  push(imType: string, groupCode: string, userID: string, title: string, content: string, options?: Record<string, unknown>, timeout?: number): Promise<number>
  pushImage(imType: string, groupCode: string, userID: string, title: string, imageUrl: string): Promise<unknown>
  pushVideo(imType: string, groupCode: string, userID: string, title: string, videoUrl: string): Promise<unknown>
  pushVoice(imType: string, groupCode: string, userID: string, title: string, voiceUrl: string): Promise<unknown>
  pushFile(imType: string, groupCode: string, userID: string, title: string, fileUrl: string, options?: AutClawMiddleware.MediaOptions): Promise<unknown>
  pushMixed(imType: string, groupCode: string, userID: string, title: string, items: AutClawMiddleware.MediaItem[]): Promise<unknown>

  fileDownload(url: string, path?: string): Promise<AutClawMiddleware.FileDownloadResult>
  downloadAdapterFile(file: AutClawMiddleware.MediaItem | Record<string, unknown> | string, options?: Record<string, unknown> | number, timeout?: number): Promise<AutClawMiddleware.FileDownloadResult>
  getGroupMemberList(groupIDOrOptions?: string | AutClawMiddleware.GroupMemberListOptions, options?: AutClawMiddleware.GroupMemberListOptions | number, timeout?: number): Promise<AutClawMiddleware.GroupMemberListResult>

  name(): Promise<string>
  domain(): Promise<string>
  port(): Promise<string | number>
  machineId(): Promise<string>
  version(): Promise<string>
  versionInfo(): Promise<AutClawMiddleware.VersionInfo>
  importModule(module: string, versionOrOptions?: string | AutClawMiddleware.ImportModuleOptions, manager?: string): Promise<unknown>
  accessService(path: string, body?: Record<string, unknown> | null, timeout?: number): Promise<unknown>

  get(key: string): Promise<unknown>
  set(key: string, value: unknown): Promise<unknown>
  del(key: string): Promise<unknown>
  bucketGet(bucket: string, key: string): Promise<unknown>
  bucketSet(bucket: string, key: string, value: unknown): Promise<unknown>
  bucketDel(bucket: string, key: string): Promise<unknown>
  bucketKeys(bucket: string, value?: unknown): Promise<string[]>
  bucketAllKeys(bucket: string): Promise<string[]>
  bucketAll(bucket: string): Promise<Record<string, unknown>>

  notifyMasters(content: string, imtypes?: string[]): Promise<unknown>
  coffee(): Promise<boolean>
  spread(msg: string): Promise<unknown>
  getHistoryMessages(imtype?: string): Promise<unknown[]>
  generateFromSinglePrompt(prompt: string): Promise<string>

  getRouter(): Promise<string>
  getMethod(): Promise<string>
  getRouterData(): Promise<string>
}

export = middleware
