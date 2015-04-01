require 'sinatra'
require 'pusher'

Pusher.app_id = '105362'
Pusher.key = '5fc7c2b982b526113bff'
Pusher.secret = '75fe6698eb03e6ed17ea'

$nouns = ['abyss', 'animal', 'apple', 'atoll', 'aurora', 'autumn', 'bacon', 'badlands', 'ball', 'banana', 'bath', 'beach', 'bear', 'bed', 'bee', 'bike', 'bird', 'boat', 'book', 'bowl', 'branch', 'bread', 'breeze', 'briars', 'brook', 'brush', 'bunny', 'bush', 'candy', 'canopy', 'canyon', 'car', 'cat', 'cave', 'cavern', 'cereal', 'chair', 'chasm', 'chip', 'cliff', 'coal', 'coast', 'cookie', 'cove', 'cow', 'crater', 'creek', 'darkness', 'dawn', 'desert', 'dew', 'dog', 'door', 'dove', 'drylands', 'duck', 'dusk', 'earth', 'fall', 'farm', 'fern', 'field', 'firefly', 'fish', 'fjord', 'flood', 'flower', 'flowers', 'fog', 'foliage', 'forest', 'freeze', 'frog', 'fu', 'galaxy', 'garden', 'geyser', 'gift', 'glass', 'grove', 'guide', 'guru', 'hat', 'hug', 'hero', 'hill', 'horse', 'house', 'hurricane', 'ice', 'iceberg', 'island', 'juice', 'lagoon', 'lake', 'land', 'lawn', 'leaf', 'leaves', 'light', 'lion', 'marsh', 'meadow', 'milk', 'mist', 'moon', 'moss', 'mountain', 'mouse', 'nature', 'oasis', 'ocean', 'pants', 'peak', 'pebble', 'pine', 'pilot', 'plane', 'planet', 'plant', 'plateau', 'pond', 'prize', 'rabbit', 'rain', 'range', 'reef', 'reserve', 'resonance', 'river', 'rock', 'sage', 'salute', 'sanctuary', 'sand', 'sands', 'shark', 'shelter', 'shirt', 'shoe', 'silence', 'sky', 'smokescreen', 'snowflake', 'socks', 'soil', 'soul', 'soup', 'sparrow', 'spoon', 'spring', 'star', 'stone', 'storm', 'stream', 'summer', 'summit', 'sun', 'sunrise', 'sunset', 'sunshine', 'surf', 'swamp', 'table', 'teacher', 'temple', 'thorns', 'tiger', 'tigers', 'towel', 'train', 'tree', 'truck', 'tsunami', 'tundra', 'valley', 'volcano', 'water', 'waterfall', 'waves', 'wild', 'willow', 'window', 'winds', 'winter', 'zebra']
$adjectives = ['able', 'action', 'active', 'actual', 'adept', 'adored', 'adroit', 'affectionate', 'agile', 'airy', 'alert', 'alive', 'alter', 'amiable', 'ample', 'and', 'anima', 'apt', 'ardent', 'are', 'astute', 'august', 'avid', 'awake', 'aware', 'balmy', 'benevolent', 'big', 'billowing', 'blessed', 'bold', 'boss', 'brainy', 'brave', 'brawny', 'breezy', 'brief', 'bright', 'brisk', 'busy', 'calm', 'can', 'canny', 'cared', 'caring', 'casual', 'celestial', 'charming', 'chic', 'chief', 'choice', 'chosen', 'chummy', 'civic', 'civil', 'classy', 'clean', 'clear', 'clever', 'close', 'cogent', 'composed', 'condemned', 'cool', 'cosmic', 'cozy', 'cuddly', 'cute', 'dainty', 'dandy', 'dapper', 'daring', 'dear', 'decent', 'deep', 'deft', 'deluxe', 'devout', 'direct', 'divine', 'doted', 'doting', 'dreamy', 'driven', 'dry', 'earthy', 'easy', 'elated', 'end', 'energized', 'enigmatic', 'equal', 'exact', 'exotic', 'expert', 'exuberant', 'fair', 'famed', 'famous', 'fancy', 'fast', 'fiery', 'fine', 'fit', 'flashy', 'fleet', 'flowing', 'fluent', 'fluffy', 'fluttering', 'flying', 'fond', 'for', 'frank', 'free', 'fresh', 'frightened', 'full', 'fun', 'funny', 'fuscia', 'gas', 'genial', 'gentle', 'giddy', 'gifted', 'giving', 'glad', 'gnarly', 'gold', 'golden', 'good', 'goodly', 'graceful', 'grand', 'greasy', 'great', 'green', 'grieving', 'groovy', 'guided', 'gutsy', 'haloed', 'happy', 'hardy', 'harmonious', 'hearty', 'heroic', 'high', 'hip', 'hollow', 'holy', 'homeless', 'honest', 'huge', 'human', 'humane', 'humble', 'hunky', 'icy', 'ideal', 'immune', 'indigo', 'inquisitive', 'jazzed', 'jazzy', 'jolly', 'jovial', 'joyful', 'joyous', 'jubilant', 'juicy', 'just', 'keen', 'khaki', 'kind', 'kingly', 'large', 'lavish', 'lawful', 'left', 'legal', 'legit', 'light', 'like', 'liked', 'likely', 'limber', 'limitless', 'lively', 'loved', 'lovely', 'loyal', 'lucid', 'lucky', 'lush', 'main', 'major', 'master', 'mature', 'max', 'maxed', 'mellow', 'merciful', 'merry', 'mighty', 'mint', 'mirthful', 'modern', 'modest', 'money', 'moonlit', 'moral', 'moving', 'mucho', 'mutual', 'mysterious', 'native', 'natural', 'near', 'neat', 'needed', 'new', 'nice', 'nifty', 'nimble', 'noble', 'normal', 'noted', 'novel', 'okay', 'open', 'outrageous', 'overt', 'pacific', 'parched', 'peachy', 'peppy', 'pithy', 'placid', 'pleasant', 'plucky', 'plum', 'poetic', 'poised', 'polite', 'posh', 'potent', 'pretty', 'prime', 'primo', 'prized', 'pro', 'prompt', 'proper', 'proud', 'pumped', 'punchy', 'pure', 'purring', 'quaint', 'quick', 'quiet', 'rad', 'radioactive', 'rapid', 'rare', 'reach', 'ready', 'real', 'regal', 'resilient', 'rich', 'right', 'robust', 'rooted', 'rosy', 'rugged', 'safe', 'sassy', 'saucy', 'savvy', 'scenic', 'screeching', 'secret', 'seemly', 'sensitive', 'serene', 'sharp', 'showy', 'shrewd', 'simple', 'sleek', 'slick', 'smart', 'smiley', 'smooth', 'snappy', 'snazzy', 'snowy', 'snugly', 'social', 'sole', 'solitary', 'sound', 'spacial', 'spicy', 'spiffy', 'spry', 'stable', 'star', 'stark', 'steady', 'stoic', 'strong', 'stunning', 'sturdy', 'suave', 'subtle', 'sunny', 'sunset', 'super', 'superb', 'sure', 'swank', 'sweet', 'swell', 'swift', 'talented', 'teal', 'the', 'thriving', 'tidy', 'timely', 'top', 'tops', 'tough', 'touted', 'tranquil', 'trim', 'tropical', 'true', 'trusty', 'try', 'undisturbed', 'unique', 'united', 'unsightly', 'unwavering', 'upbeat', 'uplifting', 'urbane', 'usable', 'useful', 'utmost', 'valid', 'vast', 'vestal', 'viable', 'vital', 'vivid', 'vocal', 'vogue', 'voiceless', 'volant', 'wandering', 'wanted', 'warm', 'wealthy', 'whispering', 'whole', 'winged', 'wired', 'wise', 'witty', 'wooden', 'worthy', 'zealous']


module Sinatra
  module OrdinalizeHelper
    def ordinal(number)
      abs_number = number.to_i.abs

      if (11..13).include?(abs_number % 100)
        "th"
      else
        case abs_number % 10
          when 1; "st"
          when 2; "nd"
          when 3; "rd"
          else    "th"
        end
      end
    end

    def ordinalize(number)
      "#{ordinal(number)}"
    end
  end

  helpers OrdinalizeHelper
end

get // do
  if request.path_info == "/"
    rand_noun = $nouns.sample
    rand_adj = $adjectives.sample
    rand_num = SecureRandom.random_number(99) + 1
    @channel_name = "#{rand_adj}-#{rand_noun}-#{rand_num}"
    redirect "/#{@channel_name}"
  else
    @channel_name = request.path_info.split('/')[-1]
  end
	erb :index
end

post '/notification' do
	message = params[:message]
	Pusher.trigger("#{params[:channel]}", 'new_notification', {
		message: CGI.escapeHTML(message)
	})
end