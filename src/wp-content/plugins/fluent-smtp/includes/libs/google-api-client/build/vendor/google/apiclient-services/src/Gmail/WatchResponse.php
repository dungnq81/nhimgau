<?php

/*
 * Copyright 2014 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */
namespace FluentSmtpLib\Google\Service\Gmail;

class WatchResponse extends \FluentSmtpLib\Google\Model
{
    /**
     * @var string
     */
    public $expiration;
    /**
     * @var string
     */
    public $historyId;
    /**
     * @param string
     */
    public function setExpiration($expiration)
    {
        $this->expiration = $expiration;
    }
    /**
     * @return string
     */
    public function getExpiration()
    {
        return $this->expiration;
    }
    /**
     * @param string
     */
    public function setHistoryId($historyId)
    {
        $this->historyId = $historyId;
    }
    /**
     * @return string
     */
    public function getHistoryId()
    {
        return $this->historyId;
    }
}
// Adding a class alias for backwards compatibility with the previous class name.
\class_alias(\FluentSmtpLib\Google\Service\Gmail\WatchResponse::class, 'FluentSmtpLib\\Google_Service_Gmail_WatchResponse');
